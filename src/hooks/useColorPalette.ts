import { useMemo } from "react";
import { useThemeState } from "./useTheme";

type RGB = {
  r: number;
  g: number;
  b: number;
};

type HSL = {
  h: number;
  s: number;
  l: number;
};

/**
 * Convert HEX to RGB.
 * Supports formats: #RRGGBB and #RGB.
 */
const hexToRgb = (hex: string): RGB => {
  let cleaned = hex.replace("#", "");
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const bigint = parseInt(cleaned, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
};

/**
 * Convert RGB to HEX.
 */
const rgbToHex = ({ r, g, b }: RGB): string => {
  const toHex = (num: number) => {
    const hex = num.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert RGB to HSL.
 */
const rgbToHsl = ({ r, g, b }: RGB): HSL => {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d === 0) {
    h = s = 0; // achromatic
  } else {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }
  return { h, s, l };
};

/**
 * Convert HSL to RGB.
 */
const hslToRgb = ({ h, s, l }: HSL): RGB => {
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

/**
 * Convert HSL to HEX.
 */
const hslToHex = (hsl: HSL): string => {
  const rgb = hslToRgb(hsl);
  return rgbToHex(rgb);
};

/**
 * Adjust the base HSL color based on the theme.
 * If dark mode, increase the lightness slightly.
 */
const adjustForTheme = (hsl: HSL, isThemeDark: boolean): HSL => {
  if (isThemeDark) {
    return { ...hsl, l: Math.min(hsl.l + 0.1, 1) };
  }
  return hsl;
};

/**
 * Generate analogous colors by adjusting the hue.
 * Colors are spread evenly over a fixed range (e.g., ±30° around the base hue).
 * For count=1, returns the base color.
 */
const generateAnalogousColors = (
  hex: string,
  count: number,
  isThemeDark: boolean
): string[] => {
  let baseHsl = rgbToHsl(hexToRgb(hex));
  // Adjust the base color based on the theme
  baseHsl = adjustForTheme(baseHsl, isThemeDark);

  // Define a total spread in degrees (30° on each side)
  const spread = 60;
  const result: string[] = [];

  if (count === 1) {
    result.push(hex);
  } else {
    for (let i = 0; i < count; i++) {
      // Calculate new hue:
      // Convert spread to fraction (degrees/360)
      const offsetFraction = (spread / 360) * (i / (count - 1)) - spread / 720;
      let newHue = baseHsl.h + offsetFraction;
      if (newHue < 0) newHue += 1;
      if (newHue > 1) newHue -= 1;
      result.push(hslToHex({ ...baseHsl, h: newHue }));
    }
  }
  return result;
};

/**
 * Generate variants of a base color by adjusting its lightness.
 * Produces 'count' variants evenly distributed between a defined dark and light adjustment.
 */
const generateVariants = (
  baseHex: string,
  count: number,
  isThemeDark: boolean
): string[] => {
  let baseHsl = rgbToHsl(hexToRgb(baseHex));
  // Adjust the base color based on the theme
  baseHsl = adjustForTheme(baseHsl, isThemeDark);

  const result: string[] = [];
  // Define a maximum lightness adjustment (e.g., ±20% from the base lightness)
  const delta = 0.2;

  if (count === 1) {
    result.push(baseHex);
  } else {
    for (let i = 0; i < count; i++) {
      // Calculate a new lightness linearly spanning from base lightness - delta to base lightness + delta.
      let newL = baseHsl.l - delta + (i * (2 * delta)) / (count - 1);
      // Ensure new lightness is within [0,1]
      newL = Math.min(1, Math.max(0, newL));
      result.push(hslToHex({ ...baseHsl, l: newL }));
    }
  }
  return result;
};

/**
 * Determine if a color is "dark" based on its perceived luminance.
 */
const isColorDark = (hex: string): boolean => {
  const { r, g, b } = hexToRgb(hex);
  // Calculate perceived brightness (using a standard formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};

interface UseColorPaletteReturn {
  palette: string[];
  generateVariants: (baseHex: string, count: number) => string[];
  isColorDark: (hex: string) => boolean;
}

/**
 * useColorPalette hook.
 *
 * @param themeColor - Base theme color in HEX (e.g., "#3498db").
 * @param count - Number of analogous colors to generate.
 *
 * Returns:
 * - palette: an array of analogous colors in HEX.
 * - generateVariants: function to generate variants from any base HEX color.
 * - isColorDark: function to determine if a HEX color is dark.
 *
 * Colors are adjusted based on the current theme state.
 */
const useColorPalette = (
  themeColor: string,
  count: number
): UseColorPaletteReturn => {
  const { isDark } = useThemeState();

  const palette = useMemo(
    () => generateAnalogousColors(themeColor, count, isDark),
    [themeColor, count, isDark]
  );

  // Wrap generateVariants so that it automatically uses the current theme state.
  const themedGenerateVariants = (baseHex: string, count: number): string[] =>
    generateVariants(baseHex, count, isDark);

  return {
    palette,
    generateVariants: themedGenerateVariants,
    isColorDark,
  };
};

export default useColorPalette;
