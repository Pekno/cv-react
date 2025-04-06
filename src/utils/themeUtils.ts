// src/utils/themeUtils.ts
import { hexToRgb, rgbToHsl, hslToHex } from "./colorUtils";
import type { MantineColorsTuple } from "@mantine/core";

/**
 * Generate a full brand color palette (10 shades) from a base color
 *
 * @param baseColor The primary brand color (will be shade 6)
 * @returns Array of 10 color shades from lightest (0) to darkest (9)
 */
export function generateBrandPalette(baseColor: string): MantineColorsTuple {
  // Default base color if none provided
  const color = baseColor || "#2b689c";

  // Convert to HSL for easier manipulation
  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb);

  // Create array of 10 colors with varying lightness
  const palette: string[] = [];

  // Generate lighter shades (0-5)
  for (let i = 0; i <= 5; i++) {
    // Calculate lightness, scaling from very light (0.95) to the base color lightness
    // Exponential scaling gives more natural progression
    const lightness = hsl.l + (0.95 - hsl.l) * Math.pow(1 - i / 5, 1.5);
    palette.push(hslToHex({ ...hsl, l: lightness }));
  }

  // Add the base color at position 6
  palette.push(color);

  // Generate darker shades (7-9)
  for (let i = 7; i <= 9; i++) {
    // Calculate lightness, scaling from the base color to very dark (0.05)
    // Use a similar exponential scale for natural progression
    const lightness = hsl.l * Math.pow(1 - (i - 6) / 4, 1.7);
    palette.push(hslToHex({ ...hsl, l: lightness }));
  }

  // Ensure we have exactly 10 colors
  while (palette.length < 10) {
    const last = palette[palette.length - 1];
    if (last !== undefined) {
      palette.push(last);
    }
  }

  // We need to create a proper MantineColorsTuple with exactly 10 elements
  return [
    palette[0],
    palette[1],
    palette[2],
    palette[3],
    palette[4],
    palette[5],
    palette[6],
    palette[7],
    palette[8],
    palette[9],
  ] as MantineColorsTuple;
}

/**
 * Get the primary color to use based on color scheme
 * @param brandColor The configured brand color
 * @param isDark Whether dark mode is active
 * @returns The primary color to use
 */
export function getPrimaryThemeColor(
  brandColor: string,
  isDark: boolean
): string {
  // Ensure we have a valid color
  const color = brandColor || "#2b689c";
  const palette = generateBrandPalette(color);
  return isDark ? palette[7] : palette[6]; // Use a darker shade in dark mode
}

/**
 * Get the appropriate accent color to use based on color scheme
 * @param brandColor The configured brand color
 * @param isDark Whether dark mode is active
 * @returns The accent color to use
 */
export function getAccentThemeColor(
  brandColor: string,
  isDark: boolean
): string {
  // Ensure we have a valid color
  const color = brandColor || "#2b689c";
  const palette = generateBrandPalette(color);
  return isDark ? palette[4] : palette[5]; // Slightly lighter accent in dark mode
}
