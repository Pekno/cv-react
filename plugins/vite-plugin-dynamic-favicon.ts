// plugins/vite-plugin-dynamic-favicon.ts
import { Plugin } from "vite";
import fs from "fs";
import path from "path";
import { getInitials } from "../src/utils/faviconGenerator";
import { getLighterColor } from "../src/utils/colorUtils";

interface DynamicFaviconOptions {
  /**
   * Path to profile data file (main or example based on build mode)
   */
  profilePath: string;

  /**
   * Path to SVG template file
   */
  templatePath: string;

  /**
   * Output path for favicon (relative to public directory)
   */
  outputPath: string;

  /**
   * Default light mode primary color (used if not specified in profile)
   */
  defaultLightColor?: string;

  /**
   * Default dark mode primary color (used if not specified in profile)
   */
  defaultDarkColor?: string;
}

/**
 * Process an SVG template by replacing placeholders with values
 */
function processTemplate(
  template: string,
  values: Record<string, string>
): string {
  let result = template;

  // Replace each placeholder with its corresponding value
  for (const [key, value] of Object.entries(values)) {
    const placeholder = "${" + key + "}";
    result = result.replaceAll(placeholder, value);
  }

  return result;
}

/**
 * Extract theme color from profile data
 */
function extractThemeColor(profileContent: string): string | null {
  // Try to extract color from theme configuration
  const themeColorMatch = profileContent.match(
    /primaryColor\s*:\s*["']([^"']+)["']/
  );
  if (themeColorMatch && themeColorMatch[1]) {
    return themeColorMatch[1];
  }

  return null;
}

/**
 * Vite plugin that generates a dynamic favicon based on profile data and theme colors
 */
export default function dynamicFavicon(options: DynamicFaviconOptions): Plugin {
  const {
    profilePath = path.resolve("./src/data/profile-data.ts"),
    templatePath = path.resolve("./src/assets/static/favicon-template.svg"),
    outputPath = "favicon.svg",
  } = options;

  // Create a logger function in closure scope
  const logger = {
    info(msg: string): void {
      const prefix = `[dynamic-favicon-plugin]`;
      console.log(`\x1b[36m${prefix}\x1b[0m ${msg}`);
    },

    error(msg: string): void {
      const prefix = `[dynamic-favicon-plugin]`;
      console.error(`\x1b[31m${prefix}\x1b[0m ${msg}`);
    },
  };

  return {
    name: "vite-plugin-dynamic-favicon",
    enforce: "pre" as const,

    buildStart(): void {
      try {
        // Read the SVG template
        if (!fs.existsSync(templatePath)) {
          throw new Error(`Template file not found at ${templatePath}`);
        }

        const templateContent = fs.readFileSync(templatePath, "utf-8");

        // Read the profile data file
        if (!fs.existsSync(profilePath)) {
          throw new Error(`Profile data file not found at ${profilePath}`);
        }

        logger.info(`Using profile data from: ${path.basename(profilePath)}`);

        const profileFile = fs.readFileSync(profilePath, "utf-8");

        // Extract the name from the profile data
        const nameMatch = profileFile.match(/name:\s*["']([^"']+)["']/);
        // Ensure name is always a string to satisfy TypeScript
        const name: string =
          nameMatch && nameMatch[1] ? nameMatch[1] : "CV React";

        // Extract the theme color from profile data
        const themeColor = extractThemeColor(profileFile);

        // Get the initials
        const initials = getInitials(name);

        // Generate light mode version using theme color if available
        const lightColor = themeColor || "#2b689c";
        const lightLighterColor = getLighterColor(lightColor, 0.8);

        const lightModeSvg = processTemplate(templateContent, {
          color: lightColor,
          lightColor: lightLighterColor,
          text: initials,
        });

        // Generate dark mode version
        // For dark mode, we use a darker shade of the theme color
        const darkColor = themeColor
          ? getLighterColor(themeColor, -0.5) // Darken the theme color by 20%
          : "#23547f";
        const darkLighterColor = getLighterColor(darkColor, 0.8);

        const darkModeSvg = processTemplate(templateContent, {
          color: darkColor,
          lightColor: darkLighterColor,
          text: initials,
        });

        logger.info(`${lightColor} - ${darkColor}`);
        logger.info(`${lightLighterColor} - ${darkLighterColor}`);

        // Create public directory if it doesn't exist
        const publicDir = path.resolve("./public");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        // Create a prefers-color-scheme version if dark mode is available
        // This uses a media query within the SVG to switch between light/dark versions
        const combinedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <style>
          @media (prefers-color-scheme: dark) {
            #favicon { display: none; }
            #favicon-dark { display: block; }
          }
          @media (prefers-color-scheme: light) {
            #favicon { display: block; }
            #favicon-dark { display: none; }
          }
        </style>
        
        <g id="favicon">${lightModeSvg
          .replace(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">',
            ""
          )
          .replace("</svg>", "")}</g>
        
        <g id="favicon-dark" style="display:none">${darkModeSvg
          .replace(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">',
            ""
          )
          .replace("</svg>", "")}</g>
        </svg>`;

        // Write the combined adaptive SVG
        const adaptiveOutputPath = path.join(publicDir, "favicon-adaptive.svg");
        fs.writeFileSync(adaptiveOutputPath, combinedSvg);

        // Log color information
        const colorInfo = themeColor
          ? `using theme color: ${themeColor}`
          : `using default colors (no theme color found in profile)`;

        logger.info(
          `Generated dynamic favicon with initials "${initials}" (${colorInfo})`
        );
        logger.info(`- Adaptive favicon: ${adaptiveOutputPath}`);
      } catch (err) {
        const error = err as Error;
        logger.error(`Error generating dynamic favicon: ${error.message}`);
      }
    },
  };
}
