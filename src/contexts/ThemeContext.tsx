import React, { createContext, ReactNode } from 'react';
import { MantineColorScheme } from '@mantine/core';
import { useThemeState } from '../hooks/useTheme';

// Define the shape of our context
interface ThemeContextType {
  colorScheme: MantineColorScheme;
  toggleColorScheme: (value?: MantineColorScheme) => void;
  isDark: boolean;
}

// Create the context with a default value (undefined for type safety)
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * Theme provider component that manages color scheme state
 * This wraps the application to provide theme context
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Use our custom hook to manage theme state
  const themeState = useThemeState();
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};
