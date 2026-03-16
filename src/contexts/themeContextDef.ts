import { createContext } from 'react';
import { MantineColorScheme } from '@mantine/core';

export interface ThemeContextType {
  colorScheme: MantineColorScheme;
  toggleColorScheme: (value?: MantineColorScheme) => void;
  isDark: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
