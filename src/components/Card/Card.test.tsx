import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { vi } from 'vitest';

describe('Card Component', () => {
  it('renders the name prop correctly', () => {
    const name = 'Luke Skywalker';
    const mockOnClick = vi.fn();

    render(<Card name={name} onClick={mockOnClick} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(name);
  });

  it('calls onClick when the card is clicked', () => {
    const name = 'Luke Skywalker';
    const mockOnClick = vi.fn();

    render(<Card name={name} onClick={mockOnClick} />);

    const card = screen.getByText(name);
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
