import { render, screen } from '@testing-library/react';
import NotFound from '../pages/404.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('NotFoundPage', () => {
  it('renders the NotFoundPage component', () => {
    render(<NotFound />);

    expect(screen.getByText(/Go Home/i)).toBeInTheDocument();
  });
});
