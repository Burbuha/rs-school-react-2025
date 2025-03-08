import { render, screen, fireEvent } from '@testing-library/react';
import { AppProviders } from './AppProviders.tsx';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';

const TestComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <span data-testid="theme-text">{theme}</span>
      <button data-testid="theme-button" onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('theme-button')).toBeInTheDocument();
  });

  it('provides the correct theme context value', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('theme-text')).toHaveTextContent('dark');
  });

  it('toggles theme from dark to light', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    expect(screen.getByTestId('theme-text')).toHaveTextContent('dark');
    fireEvent.click(screen.getByTestId('theme-button'));
    expect(screen.getByTestId('theme-text')).toHaveTextContent('light');
  });

  it('toggles theme from light to dark', () => {
    render(
      <AppProviders>
        <TestComponent />
      </AppProviders>
    );

    fireEvent.click(screen.getByTestId('theme-button'));
    expect(screen.getByTestId('theme-text')).toHaveTextContent('light');
    fireEvent.click(screen.getByTestId('theme-button'));
    expect(screen.getByTestId('theme-text')).toHaveTextContent('dark');
  });
});
