import { useMemo, useRef } from "react";

/**
 * Seeded random number generator for deterministic colors
 */
const seededRandom = (seed: number) => {
  let r = seed;
  return () => {
    const v = r * Math.PI;
    r = v - (v | 0);
    return r;
  };
};

/**
 * Converts a hex color to HSL
 * @param hex - Hex color code (e.g., '#2b689c')
 * @returns HSL values as {h, s, l}
 */
const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
  // Remove the # if present
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex.charAt(0) + hex.charAt(0), 16) / 255;
    g = parseInt(hex.charAt(1) + hex.charAt(1), 16) / 255;
    b = parseInt(hex.charAt(2) + hex.charAt(2), 16) / 255;
  } else {
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
    b = parseInt(hex.substring(4, 6), 16) / 255;
  }

  // Find max and min values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  
  // Calculate lightness
  let h = 0, s = 0, l = (max + min) / 2;

  // Calculate saturation
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    // Calculate hue
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h = h / 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

/**
 * Converts HSL values to a CSS HSL color string
 * @param h - Hue (0-360)
 * @param s - Saturation (0-100)
 * @param l - Lightness (0-100)
 * @returns HSL color string
 */
const hslToString = (h: number, s: number, l: number): string => {
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * A hook that generates a consistent color palette and maps strings to colors from this palette.
 * Includes utilities for generating harmonious color schemes.
 *
 * @param paletteSize - The number of colors to generate in the palette
 * @param seed - Optional seed for deterministic palette generation
 * @returns Object with palette and functions to get and manipulate colors
 */
export const useColorPalette = (paletteSize: number = 10, seed: number = 1) => {
  // Create a seeded random function
  const rando = useMemo(() => seededRandom(seed), [seed]);

  // Use a ref to store the color map to avoid unnecessary re-renders
  const colorMapRef = useRef<Record<string, string>>({});

  /**
   * Generates an HSL color based on index and total palette size
   */
  const generateHSLColor = useMemo(() => {
    return (index: number, total: number): string => {
      // Use golden ratio to space hues evenly
      const goldenRatioConjugate = 0.618033988749895;

      // Calculate hue based on the golden ratio to get even spacing
      // We use the seed to determine the starting point
      const seedValue = rando(); // Use the rando function from useMemo
      let hue = (seedValue / paletteSize + goldenRatioConjugate * index) % 1;
      hue = (hue * 360) % 360;

      // Add some variation in saturation and lightness, but keep them in a pleasing range
      // Use index to deterministically vary these values
      const saturationBase = 65;
      const saturationVariation = 10;
      const saturation = saturationBase + ((index % 3) * saturationVariation) / 2;

      const lightnessBase = 55;
      const lightnessVariation = 15;
      const lightness =
        lightnessBase + (((index + total / 2) % 3) * lightnessVariation) / 2;

      return hslToString(Math.round(hue), Math.round(saturation), Math.round(lightness));
    };
  }, [paletteSize, rando]);

  /**
   * Generate the color palette once based on the seed and size
   */
  const colorPalette = useMemo(() => {
    const newColors: string[] = [];
    for (let i = 0; i < paletteSize; i++) {
      newColors.push(generateHSLColor(i, paletteSize));
    }
    return newColors;
  }, [paletteSize, generateHSLColor]);

  /**
   * Generates analogous colors based on a theme color
   * @param themeColor - The base theme color in hex format (e.g., '#2b689c')
   * @param count - Number of colors to generate
   * @returns Array of HSL color strings
   */
  const generateAnalogousColors = useMemo(() => {
    return (themeColor: string, count: number): string[] => {
      // Convert the theme color to HSL
      const { h, s, l } = hexToHSL(themeColor);
      
      // Generate colors with analogous hues (30° steps is common for analogous colors)
      const hueStep = 30;
      const colors: string[] = [];
      
      // Calculate the starting hue to center the analogous colors around the theme
      const startHue = (h - (Math.floor(count / 2) * hueStep)) % 360;
      
      for (let i = 0; i < count; i++) {
        // Calculate hue with 30° steps, ensuring it stays in the 0-360 range
        const newHue = (startHue + (i * hueStep)) % 360;
        // Vary saturation slightly for more visual interest
        const newSat = Math.min(100, Math.max(30, s + (i % 3 - 1) * 5));
        // Vary lightness slightly
        const newLight = Math.min(80, Math.max(30, l + (i % 2) * 5));
        
        colors.push(hslToString(newHue, newSat, newLight));
      }
      
      return colors;
    };
  }, []);

  /**
   * Generates color variations based on a base color
   * @param baseColor - Base color in HSL format
   * @param count - Number of variations to generate
   * @returns Array of HSL color strings
   */
  const generateColorVariations = useMemo(() => {
    return (baseColor: string, count: number): string[] => {
      // Extract HSL values from the baseColor
      const match = baseColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
      if (!match) return Array(count).fill(baseColor);
      
      const h = parseInt(match[1]);
      const s = parseInt(match[2]);
      const l = parseInt(match[3]);
      
      // Generate variations by adjusting hue and saturation
      return Array.from({ length: count }, (_, i) => {
        // Create variations around the base hue with smaller steps (15°)
        // to keep them more closely related than analogous colors
        const hueVariation = (h + (i * 15) % 30 - 15) % 360;
        // Vary saturation slightly
        const satVariation = Math.min(100, Math.max(40, s + (i % 3 - 1) * 5));
        // Keep lightness close to original
        const lightVariation = Math.min(80, Math.max(40, l + (i % 2) * 5));
        
        return hslToString(hueVariation, satVariation, lightVariation);
      });
    };
  }, []);

  /**
   * Hash a string to use as an index into the color palette
   */
  const hashString = (str: string): number => {
    let hash = 0;
    if (str.length === 0) return hash;

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Ensure positive hash
    return Math.abs(hash);
  };

  /**
   * Get a consistent color for a given string
   */
  const getColorForString = (str: string): string => {
    if (!str || !colorPalette.length) return "hsl(209, 70%, 55%)"; // Default color

    // Check if we already mapped this string to a color
    if (colorMapRef.current[str]) {
      return colorMapRef.current[str];
    }

    // Map the string to a color in our palette
    const hash = hashString(str);
    const colorIndex = hash % colorPalette.length;
    const color = colorPalette[colorIndex];

    // Store mapping for future consistency using the ref
    colorMapRef.current[str] = color;

    return color;
  };

  /**
   * Determine if a color is dark (for text contrast)
   */
  const isColorDark = (color: string): boolean => {
    // For HSL colors
    if (color.startsWith("hsl")) {
      const match = color.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
      if (match) {
        const l = parseInt(match[3]);
        return l < 50;
      }
    }

    // For hex colors
    if (color.startsWith("#")) {
      const r = parseInt(color.substr(1, 2), 16);
      const g = parseInt(color.substr(3, 2), 16);
      const b = parseInt(color.substr(5, 2), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness < 128;
    }

    return false;
  };

  return {
    palette: colorPalette,
    getColorForString,
    isColorDark,
    generateAnalogousColors,
    generateColorVariations,
    hexToHSL,
    hslToString,
  };
};
