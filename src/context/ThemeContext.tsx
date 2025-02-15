import { createContext, useContext } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: VoidFunction;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
