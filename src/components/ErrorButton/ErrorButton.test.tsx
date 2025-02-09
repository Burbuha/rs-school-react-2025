import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorButton } from './ErrorButton';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { vi } from 'vitest';

describe('ErrorButton Component', () => {
  it('should throw an error when the button is clicked', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Throw Error');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    expect(
      screen.getByText('Test error after button click')
    ).toBeInTheDocument();
  });

  it('does not show an error before the button is clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(screen.getByText('Throw Error')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong!')).not.toBeInTheDocument();
  });
});
