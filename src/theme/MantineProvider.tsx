import React from 'react';
import '@mantine/core/styles.css';
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
      h1: { fontSize: '2.5rem' },
      h2: { fontSize: '2rem' },
      h3: { fontSize: '1.5rem' },
    },
  },
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
        globalStyles: () => ({
          'h1, h2, h3, h4, h5, h6, p, span': {
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            msUserSelect: 'none',
            userSelect: 'none',
          },
          'button, a, [role="button"]': {
            cursor: 'pointer !important',
          },
        }),
      }} 
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
}