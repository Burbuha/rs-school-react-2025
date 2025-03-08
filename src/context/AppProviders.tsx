'use client';

import { PropsWithChildren, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import { store } from '../store/store';
import { Provider } from 'react-redux';

export const AppProviders = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </Provider>
  );
};
