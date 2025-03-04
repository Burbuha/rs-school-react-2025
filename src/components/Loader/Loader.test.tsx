import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('renders the loader correctly', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
