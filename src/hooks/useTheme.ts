import { useCallback, useContext, useEffect, useMemo } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { MantineColorScheme } from "@mantine/core";
import { useProfileData } from "./useProfileData";
import { getPrimaryThemeColor } from "../utils/themeUtils";

/**
 * Custom hook for managing application theme
 *
 * @returns Object with current theme state and toggle function
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // Get profile data to access theme colors
  const { data } = useProfileData();
  const brandColor = data?.theme?.primaryColor || "#2b689c";

  // Get the primary color based on the brand color and current scheme
  const primaryColor = getPrimaryThemeColor(brandColor, context.isDark);

  // Add the primary color to the context
  return {
    ...context,
    primaryColor,
    brandColor,
  };
};

/**
 * Hook to initialize and manage theme state
 * This is used in the ThemeContext provider
 *
 * @returns Theme state management object
 */
export const useThemeState = () => {
  // Check if user prefers dark mode
  const prefersDarkScheme = useMediaQuery("(prefers-color-scheme: dark)");

  // Use Mantine's useLocalStorage hook to persist theme preference
  // Default to system preference if no stored value exists
  const [colorScheme, setColorScheme] = useLocalStorage<MantineColorScheme>({
    key: "cv-theme-color-scheme",
    defaultValue: prefersDarkScheme ? "dark" : "light",
  });

  // Update theme when system preference changes if user hasn't manually set a preference
  useEffect(() => {
    const hasUserPreference =
      localStorage.getItem("cv-theme-color-scheme") !== null;
    if (!hasUserPreference) {
      setColorScheme(prefersDarkScheme ? "dark" : "light");
    }
  }, [prefersDarkScheme, setColorScheme]);

  const toggleColorScheme = useCallback(
    (value?: MantineColorScheme) => {
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    },
    [colorScheme, setColorScheme]
  );

  // Access the profile data to get theme colors
  const { data } = useProfileData();
  const brandColor = data?.theme?.primaryColor || "#2b689c";

  // Update document attributes when theme changes
  useEffect(() => {
    // Add a data attribute to the document element for easier CSS targeting
    document.documentElement.setAttribute("data-color-scheme", colorScheme);

    // Apply preferred color scheme meta tag for browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');

    // Create the meta tag if it doesn't exist
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }

    // Update the content attribute based on color scheme and brand color
    const themeColor = getPrimaryThemeColor(brandColor, colorScheme === "dark");
    metaThemeColor.setAttribute("content", themeColor);
  }, [colorScheme, brandColor]);

  // Return memoized value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      colorScheme,
      toggleColorScheme,
      isDark: colorScheme === "dark",
    }),
    [colorScheme, toggleColorScheme]
  );
};
