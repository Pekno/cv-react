import React from 'react';
import '@mantine/core/styles.css';
import './variables.css'; // Import our CSS variables
import { MantineProvider, createTheme, MantineThemeOverride } from '@mantine/core';

// Define your theme with primary color matching your original blue (#2b689c)
const theme: MantineThemeOverride = createTheme({
  colors: {
    // Add your custom brand colors
    brand: [
      '#e9f2f8', // 0 - lightest
      '#c4dbed', 
      '#9ec3e1', 
      '#79acd6', 
      '#5394cb', 
      '#2e7cbf', 
      '#2b689c', // 6 - your primary color
      '#23547f', 
      '#1b4062', 
      '#132c45'  // 9 - darkest
    ],
  },
  primaryColor: 'brand',
  primaryShade: 6,
  fontFamily: 'Signika, Roboto, sans-serif',
  headings: {
    fontFamily: 'Signika, Roboto, sans-serif',
    sizes: {
      h1: { fontSize: '2.5rem', fontWeight: 700 },
      h2: { fontSize: '2rem', fontWeight: 600 },
      h3: { fontSize: '1.5rem', fontWeight: 600 },
      h4: { fontSize: '1.25rem', fontWeight: 600 },
      h5: { fontSize: '1rem', fontWeight: 600 },
      h6: { fontSize: '0.875rem', fontWeight: 600 },
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
    xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
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
    Container: {
      defaultProps: {
        size: 'lg',
        px: 'md',
      },
    },
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        p: 'lg',
      },
      styles: (theme) => ({
        root: {
          transition: 'box-shadow 0.3s ease, transform 0.2s ease',
          '&:hover': {
            boxShadow: theme.shadows.md,
          },
        },
      }),
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: (theme) => ({
        root: {
          transition: 'all 0.2s ease',
        },
      }),
    },
    Paper: {
      defaultProps: {
        p: 'md',
        radius: 'md',
        withBorder: true,
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Image: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

interface MantineThemeProviderProps {
  children: React.ReactNode;
}

export function MantineThemeProvider({ children }: MantineThemeProviderProps): JSX.Element {
  return (
    <MantineProvider 
      theme={{
        ...theme,
        globalStyles: (theme) => ({
          // Global styles
          'html, body': {
            scrollBehavior: 'smooth',
          },
          'body': {
            color: theme.colors.gray[8],
            lineHeight: 1.6,
          },
          // Better typography
          'h1, h2, h3, h4, h5, h6': {
            marginTop: 0,
            marginBottom: theme.spacing.md,
            color: theme.colors.gray[9],
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          },
          'p': {
            marginTop: 0,
            marginBottom: theme.spacing.md,
          },
          // Links and buttons
          'a': {
            color: theme.colors.brand[6],
            textDecoration: 'none',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: theme.colors.brand[7],
              textDecoration: 'underline',
            },
          },
          'button, a, [role="button"]': {
            cursor: 'pointer !important',
          },
          // Transitions
          '.transition-fast': {
            transition: '150ms ease !important',
          },
          '.transition-normal': {
            transition: '250ms ease !important',
          },
          '.transition-slow': {
            transition: '350ms ease !important',
          },
          // Focus styles for accessibility
          '*:focus-visible': {
            outline: `2px solid ${theme.colors.brand[6]}`,
            outlineOffset: '2px',
          },
        }),
      }} 
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
}