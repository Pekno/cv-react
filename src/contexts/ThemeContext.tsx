import React from 'react';
import { useThemeState } from '../hooks/useTheme';
import { ThemeContext } from './themeContextDef';

// Re-export for consumers
export { ThemeContext } from './themeContextDef';
export type { ThemeContextType } from './themeContextDef';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const themeState = useThemeState();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};
