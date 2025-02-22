import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeContext } from './ThemeContext';
import { vi, Mock } from 'vitest';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useContext } from 'react';

vi.mock('../hooks/useLocalStorage', () => ({
  useLocalStorage: vi.fn(),
}));

const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <span>{theme}</span>
      <button data-testid="theme-button" onClick={toggleTheme} />
    </div>
  );
};

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    (useLocalStorage as Mock).mockReturnValue(['dark', vi.fn()]);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-button')).toBeInTheDocument();
  });

  it('provides the correct theme context value', () => {
    (useLocalStorage as Mock).mockReturnValue(['dark', vi.fn()]);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('toggles theme from dark to light', () => {
    const setThemeMock = vi.fn((fn) => fn('light'));
    (useLocalStorage as Mock).mockReturnValue(['dark', setThemeMock]);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('theme-button'));
    expect(setThemeMock).toHaveBeenCalledWith(expect.any(Function));
  });

  it('toggles theme from light to dark', () => {
    const setThemeMock = vi.fn((fn) => fn('dark'));
    (useLocalStorage as Mock).mockReturnValue(['light', setThemeMock]);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('theme-button'));
    expect(setThemeMock).toHaveBeenCalledWith(expect.any(Function));
  });
});
