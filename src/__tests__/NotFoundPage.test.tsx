import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useRouter } from 'next/navigation';
import NotFound from '../app/404';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });
  });

  it('renders the NotFoundPage component', () => {
    render(<NotFound />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('navigates to home on button click', () => {
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: mockPush });

    render(<NotFound />);
    fireEvent.click(screen.getByText('Go Home'));

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
