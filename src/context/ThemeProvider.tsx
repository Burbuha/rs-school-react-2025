import { PropsWithChildren } from 'react';
import { ThemeContext } from './ThemeContext';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const { storedValue: theme, setValue: setTheme } = useLocalStorage(
    'theme',
    'dark'
  );

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
