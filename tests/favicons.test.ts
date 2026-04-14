/**
 * Tests for the dynamic-favicon Vite plugin.
 *
 * After `npm run build:demo` the plugin writes all favicon assets into
 * `public/` (which Vite copies verbatim into `dist/`). These tests check:
 *  - every expected file exists
 *  - PNG files are valid PNG buffers (correct magic bytes)
 *  - the ICO file contains a proper ICO header
 *  - site.webmanifest is valid JSON with the expected shape and values
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");
const PUBLIC = path.resolve(__dirname, "../public");

// The example profile uses these values
const EXPECTED_NAME = "Alex Morgan";
const EXPECTED_INITIALS = "AM";
const EXPECTED_THEME_COLOR = "#3f51b5";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns the first 8 bytes of a file as a Buffer. */
function fileHeader(filePath: string, bytes = 8): Buffer {
  const fd = fs.openSync(filePath, "r");
  const buf = Buffer.alloc(bytes);
  fs.readSync(fd, buf, 0, bytes, 0);
  fs.closeSync(fd);
  return buf;
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function isPng(filePath: string): boolean {
  return fileHeader(filePath).equals(PNG_MAGIC);
}

function isIco(filePath: string): boolean {
  // ICO header: reserved(2)=0x0000, type(2)=0x0001
  const h = fileHeader(filePath, 4);
  return h[0] === 0x00 && h[1] === 0x00 && h[2] === 0x01 && h[3] === 0x00;
}

// ---------------------------------------------------------------------------
// Favicon file existence — checked in public/ (source) and dist/ (output)
// ---------------------------------------------------------------------------

describe("Favicon files", () => {
  const expectedFiles = [
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "site.webmanifest",
  ];

  it.each(expectedFiles)("public/%s exists after build", (file) => {
    expect(fs.existsSync(path.join(PUBLIC, file))).toBe(true);
  });

  it.each(expectedFiles)("dist/%s is copied to dist output", (file) => {
    expect(fs.existsSync(path.join(DIST, file))).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// PNG validity
// ---------------------------------------------------------------------------

describe("PNG favicon files have valid PNG headers", () => {
  const pngFiles = [
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
  ];

  it.each(pngFiles)("%s is a valid PNG", (file) => {
    expect(isPng(path.join(PUBLIC, file))).toBe(true);
  });

  it.each(pngFiles)("PNG files are not empty", (file) => {
    const size = fs.statSync(path.join(PUBLIC, file)).size;
    expect(size).toBeGreaterThan(100);
  });
});

// ---------------------------------------------------------------------------
// ICO validity
// ---------------------------------------------------------------------------

describe("favicon.ico", () => {
  it("has a valid ICO header", () => {
    expect(isIco(path.join(PUBLIC, "favicon.ico"))).toBe(true);
  });

  it("is not empty", () => {
    const size = fs.statSync(path.join(PUBLIC, "favicon.ico")).size;
    expect(size).toBeGreaterThan(200);
  });
});

// ---------------------------------------------------------------------------
// site.webmanifest
// ---------------------------------------------------------------------------

describe("site.webmanifest", () => {
  let manifest: Record<string, unknown>;

  it("is valid JSON", () => {
    const raw = fs.readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf-8");
    expect(() => { manifest = JSON.parse(raw); }).not.toThrow();
  });

  it("has the correct name from profile data", () => {
    const raw = fs.readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf-8");
    manifest = JSON.parse(raw);
    expect(manifest.name).toBe(EXPECTED_NAME);
  });

  it("has the correct short_name (initials)", () => {
    const raw = fs.readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf-8");
    manifest = JSON.parse(raw);
    expect(manifest.short_name).toBe(EXPECTED_INITIALS);
  });

  it("has the correct theme_color from profile data", () => {
    const raw = fs.readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf-8");
    manifest = JSON.parse(raw);
    expect(manifest.theme_color).toBe(EXPECTED_THEME_COLOR);
  });

  it("lists the Android Chrome icons", () => {
    const raw = fs.readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf-8");
    manifest = JSON.parse(raw);
    const icons = manifest.icons as Array<{ src: string; sizes: string }>;
    expect(Array.isArray(icons)).toBe(true);
    expect(icons.some((i) => i.sizes === "192x192")).toBe(true);
    expect(icons.some((i) => i.sizes === "512x512")).toBe(true);
  });

  it("has display set to standalone", () => {
    const raw = fs.readFileSync(path.join(PUBLIC, "site.webmanifest"), "utf-8");
    manifest = JSON.parse(raw);
    expect(manifest.display).toBe("standalone");
  });
});
