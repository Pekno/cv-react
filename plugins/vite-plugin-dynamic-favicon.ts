// plugins/vite-plugin-dynamic-favicon.ts
import { Plugin } from "vite";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { createRequire } from "module";
import { getInitials } from "../src/utils/faviconGenerator";
import { getLighterColor } from "../src/utils/colorUtils";
import { loadProfileData } from "./load-profile-data";

const require = createRequire(import.meta.url);

/**
 * Converts text to an SVG <path> element using the Signika Bold font.
 * This avoids any font rendering dependency at the OS/container level.
 */
function textToSvgPath(text: string, fill: string): string {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const opentype = require("opentype.js");
  const fontPath = require.resolve(
    "@fontsource/signika/files/signika-latin-700-normal.woff"
  );
  const font = opentype.loadSync(fontPath);

  const fontSize = 16;
  const centerX = 16;
  const baselineY = 22;

  // Measure the text width to center it horizontally
  const advanceWidth = font.getAdvanceWidth(text, fontSize);
  const x = centerX - advanceWidth / 2;

  const svgPath = font.getPath(text, x, baselineY, fontSize);
  return `<path d="${svgPath.toPathData()}" fill="${fill}" />`;
}

interface DynamicFaviconOptions {
  profilePath: string;
  templatePath: string;
  outputPath: string;
}

function processTemplate(
  template: string,
  values: Record<string, string>
): string {
  let result = template;

  for (const [key, value] of Object.entries(values)) {
    const placeholder = "${" + key + "}";
    result = result.replaceAll(placeholder, value);
  }

  return result;
}

async function svgToPng(svg: string, size: number): Promise<Buffer> {
  const scaledSvg = svg.replace(
    /viewBox="0 0 32 32"/,
    `viewBox="0 0 32 32" width="${size}" height="${size}"`
  );

  return sharp(Buffer.from(scaledSvg))
    .resize(size, size)
    .png()
    .toBuffer();
}

/**
 * Create an ICO file from multiple PNG buffers.
 * Uses the ICO format with embedded PNG payloads.
 */
function createIco(pngBuffers: { buffer: Buffer; size: number }[]): Buffer {
  const headerSize = 6;
  const entrySize = 16;
  const numImages = pngBuffers.length;

  let dataOffset = headerSize + entrySize * numImages;
  const entries: Buffer[] = [];
  const imageData: Buffer[] = [];

  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(dataOffset, 12);

    entries.push(entry);
    imageData.push(buffer);
    dataOffset += buffer.length;
  }

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

  return Buffer.concat([header, ...entries, ...imageData]);
}

/**
 * Vite plugin that generates favicon PNG/ICO variants from profile data and theme colors
 */
export default function dynamicFavicon(options: DynamicFaviconOptions): Plugin {
  const {
    profilePath = path.resolve("./src/data/profile-data.ts"),
    templatePath = path.resolve("./src/assets/static/favicon-template.svg"),
  } = options;

  const logger = {
    info(msg: string): void {
      console.log(`\x1b[36m[dynamic-favicon-plugin]\x1b[0m ${msg}`);
    },
    error(msg: string): void {
      console.error(`\x1b[31m[dynamic-favicon-plugin]\x1b[0m ${msg}`);
    },
  };

  return {
    name: "vite-plugin-dynamic-favicon",
    enforce: "pre" as const,

    async buildStart(): Promise<void> {
      try {
        if (!fs.existsSync(templatePath)) {
          throw new Error(`Template file not found at ${templatePath}`);
        }

        const templateContent = fs.readFileSync(templatePath, "utf-8");

        logger.info(`Using profile data from: ${path.basename(profilePath)}`);
        const profileData = await loadProfileData(profilePath);

        const name = profileData.meta.name || "CV React";
        const themeColor = profileData.theme?.primaryColor ?? null;
        const initials = getInitials(name);

        const color = themeColor || "#2b689c";
        const lighterColor = getLighterColor(color, 0.8);

        // Convert initials to SVG path (no font rendering dependency)
        const textPath = textToSvgPath(initials, lighterColor);

        const svg = processTemplate(templateContent, {
          color,
          textPath,
        });

        logger.info(`Color: ${color} / ${lighterColor}`);

        const publicDir = path.resolve("./public");
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true });
        }

        const variants = [
          { name: "favicon-16x16.png", size: 16 },
          { name: "favicon-32x32.png", size: 32 },
          { name: "apple-touch-icon.png", size: 180 },
          { name: "android-chrome-192x192.png", size: 192 },
          { name: "android-chrome-512x512.png", size: 512 },
        ];

        // Generate all PNG variants in parallel
        const pngResults = await Promise.all(
          variants.map(async ({ name: fileName, size }) => {
            const buffer = await svgToPng(svg, size);
            fs.writeFileSync(path.join(publicDir, fileName), buffer);
            return { fileName, size, buffer };
          })
        );

        // Generate favicon.ico (16x16 + 32x32)
        const ico16 = pngResults.find((r) => r.fileName === "favicon-16x16.png")!;
        const ico32 = pngResults.find((r) => r.fileName === "favicon-32x32.png")!;
        const icoBuffer = createIco([
          { buffer: ico16.buffer, size: 16 },
          { buffer: ico32.buffer, size: 32 },
        ]);
        fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);

        // Generate site.webmanifest
        const manifest = {
          name,
          short_name: initials,
          icons: [
            { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
          ],
          theme_color: color,
          background_color: "#ffffff",
          display: "standalone",
        };
        fs.writeFileSync(
          path.join(publicDir, "site.webmanifest"),
          JSON.stringify(manifest, null, 2)
        );

        const colorInfo = themeColor
          ? `using theme color: ${themeColor}`
          : `using default colors`;

        logger.info(
          `Generated favicons with initials "${initials}" (${colorInfo})`
        );
        logger.info(
          `  -> favicon.ico, ${variants.map((v) => v.name).join(", ")}, site.webmanifest`
        );
      } catch (err) {
        const error = err as Error;
        logger.error(`Error generating favicons: ${error.message}`);
      }
    },
  };
}
