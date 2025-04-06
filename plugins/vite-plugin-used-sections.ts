// plugins/vite-plugin-used-sections.ts
import { Plugin } from "vite";
import fs from "fs";

// Import type reference
import type { SectionTypeRegistry } from "../src/types/profile-data.types";

interface UsedSectionsOptions {
  /**
   * Path to the profile data file(s) to analyze for used sections
   * Can be a single path or an array of paths
   */
  profilePath: string;
}

/**
 * Custom plugin to analyze profile data and include only used sections
 * This optimizes the build by only importing sections that are actually used
 */
export default function usedSectionsPlugin(
  options: UsedSectionsOptions
): Plugin {
  const { profilePath } = options;
  const prefix = `[used-sections-plugin]`;

  // Store the used sections with proper typing from the registry
  let usedSections: Array<keyof SectionTypeRegistry> = [];

  // Create logger functions in closure scope
  const logger = {
    info(msg: string): void {
      console.log(`\x1b[36m${prefix}\x1b[0m ${msg}`);
    },

    error(msg: string): void {
      console.error(`\x1b[31m${prefix}\x1b[0m ${msg}`);
    },
  };

  return {
    name: "used-sections-plugin",
    enforce: "pre" as const,

    // This runs at the beginning of the build process
    buildStart(): void {
      try {
        logger.info(`Analyzing profile data file(s) for used sections`);

        const sectionsSet = new Set<string>();

        // Read each profile data file and extract section names
        if (fs.existsSync(profilePath)) {
          logger.info(`Processing file: ${profilePath}`);
          const fileContent = fs.readFileSync(profilePath, "utf-8");
          // Simple regex to extract section names
          const sectionMatches =
            fileContent.match(/sectionName:\s*["']([^"']+)["']/g) || [];

          sectionMatches.forEach((match) => {
            const nameMatch = match.match(/["']([^"']+)["']/);
            if (nameMatch && nameMatch[1]) {
              sectionsSet.add(nameMatch[1]);
            }
          });
        } else {
          logger.error(`File not found: ${profilePath}`);
        }

        // Convert Set to Array and store it
        usedSections = Array.from(sectionsSet) as Array<
          keyof SectionTypeRegistry
        >;

        // Use our logger instead of console.log
        logger.info(
          `📦 Used sections detected in profile data: ${usedSections.join(
            ", "
          )}`
        );
      } catch (error) {
        // Log errors using our logger
        logger.error(`Error analyzing profile data: ${error}`);
        usedSections = []; // Default to empty if there's an error
      }
    },

    // This transforms import statements during the build
    transform(code: string, id: string): string | null {
      // Only process the App.tsx file
      if (id.endsWith("App.tsx")) {
        // Replace the glob import with explicit imports for used sections
        if (code.includes("import.meta.glob")) {
          // Generate imports only for used sections
          const sectionImports =
            usedSections.length > 0
              ? usedSections
                  .map(
                    (section) =>
                      `import '@/components/sections/${capitalizeFirstLetter(
                        String(section)
                      )}/${capitalizeFirstLetter(String(section))}';`
                  )
                  .join("\n")
              : "// No sections detected in profile data";

          // Replace the glob import with our targeted imports
          code = code.replace(
            /import\.meta\.glob\(['"]\.\/components\/sections\/\*\/\*\.tsx['"], \{ eager: true \}\);/,
            sectionImports
          );

          // Log the transformation
          logger.info(
            `📄 Generated section imports for ${usedSections.length} sections in App.tsx`
          );

          return code;
        }
      }

      return null; // Return null to keep the original code unchanged
    },
  };
}

/**
 * Helper function to capitalize the first letter of a string
 */
function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
