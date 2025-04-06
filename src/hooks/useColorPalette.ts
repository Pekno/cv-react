import { useMemo } from "react";
import { useThemeState } from "./useTheme";
import {
  generateAnalogousColors,
  generateVariants as generateColorVariants,
  isColorDark
} from "../utils/colorUtils";

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
    generateColorVariants(baseHex, count, isDark);

  return {
    palette,
    generateVariants: themedGenerateVariants,
    isColorDark,
  };
};

export default useColorPalette;