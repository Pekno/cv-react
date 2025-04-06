import React, { JSX } from 'react';
import '@mantine/core/styles.css';
import './variables.css'; // Import our CSS variables
import { MantineProvider, createTheme, MantineColorScheme } from '@mantine/core';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useTheme } from '../hooks/useTheme';
import { generateBrandPalette } from '../utils/themeUtils';
import { useProfileData } from '../hooks/useProfileData';

/**
 * Creates a theme with both light and dark mode support
 * Handles components styling for different color schemes
 */
const createAppTheme = (colorScheme: MantineColorScheme, brandColor: string) => {
  const isDark = colorScheme === 'dark';
  
  // Generate the brand color palette from the configured primary color
  const brandPalette = generateBrandPalette(brandColor);
  
  return createTheme({
    // Remove colorScheme from here, we'll pass it to MantineProvider directly
    colors: {
      // Use the dynamically generated brand colors
      brand: brandPalette,
      // Define dark theme colors
      dark: [
        '#C1C2C5', // 0
        '#A6A7AB', // 1
        '#909296', // 2
        '#5c5f66', // 3
        '#373A40', // 4
        '#2C2E33', // 5
        '#25262b', // 6
        '#1A1B1E', // 7
        '#141517', // 8
        '#101113', // 9
      ],
    },
    primaryColor: isDark ? 'dark' : 'brand',
    primaryShade: { light: 6, dark: 5 },
    fontFamily: 'Signika, sans-serif',
    headings: {
      fontFamily: 'Signika, sans-serif',
      sizes: {
        h1: { fontSize: '2.5rem', fontWeight: '700' },
        h2: { fontSize: '2rem', fontWeight: '600' },
        h3: { fontSize: '1.5rem', fontWeight: '600' },
        h4: { fontSize: '1.25rem', fontWeight: '600' },
        h5: { fontSize: '1rem', fontWeight: '600' },
        h6: { fontSize: '0.875rem', fontWeight: '600' },
      },
    },
    // Enhanced spacing system
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '2.5rem',
      '3xl': '3rem',
    },
    // Standardized shadows
    shadows: {
      xs: isDark ? '0 1px 3px rgba(0, 0, 0, 0.3)' : '0 1px 2px rgba(0, 0, 0, 0.05)',
      sm: isDark ? '0 2px 4px rgba(0, 0, 0, 0.4)' : '0 1px 3px rgba(0, 0, 0, 0.1)',
      md: isDark ? '0 4px 8px rgba(0, 0, 0, 0.5)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: isDark ? '0 8px 16px rgba(0, 0, 0, 0.6)' : '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: isDark ? '0 12px 24px rgba(0, 0, 0, 0.7)' : '0 20px 25px rgba(0, 0, 0, 0.1)',
    },
    // Improved radius for consistency
    radius: {
      xs: '0.125rem',
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      xl: '2rem',
    },
    // Enhanced component defaults
    components: {
      AppShell: {
        styles: (theme: any) => ({
          main: {
            backgroundColor: isDark ? theme.colors.dark[8] : theme.colors.gray[0],
          }
        }),
      },
      Card: {
        styles: (theme: any) => ({
          root: {
            backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
          }
        }),
      },
      Paper: {
        styles: (theme: any) => ({
          root: {
            backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
          }
        }),
      },
      Accordion: {
        styles: (theme: any) => ({
          item: {
            backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
            borderColor: isDark ? theme.colors.dark[4] : theme.colors.gray[3],
          },
          control: {
            '&:hover': {
              backgroundColor: isDark ? theme.colors.dark[5] : theme.colors.gray[0],
            }
          },
          panel: {
            backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
          }
        }),
      },
    },
  });
};

interface MantineThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Inner provider component that uses the theme context
 */
function MantineThemeConsumer({ children }: MantineThemeProviderProps): JSX.Element {
  // Get color scheme from our theme context
  const { colorScheme } = useTheme();
  
  // Get profile data to access theme configuration
  const { data } = useProfileData();
  
  // Get the configured brand color or use default
  const brandColor = data?.theme?.primaryColor || '#2b689c';
  
  // Create a theme that includes our color scheme
  const theme = createAppTheme(colorScheme, brandColor);
  
  return (
    <MantineProvider theme={theme} defaultColorScheme={colorScheme}>
      {children}
    </MantineProvider>
  );
}

/**
 * Main theme provider that combines our custom ThemeProvider with MantineProvider
 */
export function MantineThemeProvider({ children }: MantineThemeProviderProps): JSX.Element {
  return (
    <ThemeProvider>
      <MantineThemeConsumer>
        {children}
      </MantineThemeConsumer>
    </ThemeProvider>
  );
}