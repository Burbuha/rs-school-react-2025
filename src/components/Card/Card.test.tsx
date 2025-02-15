import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { vi } from 'vitest';
import { Person } from '../../interfaces/person.interface.ts';

describe('Card Component', () => {
  const person: Person = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    gender: 'male',
    birth_year: '19BBY',
    eye_color: 'blue',
    hair_color: 'blond',
    skin_color: 'fair',
  };

  it('renders the name prop correctly', () => {
    const mockOnClick = vi.fn();

    render(<Card person={person} onPersonClick={mockOnClick} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      person.name
    );
  });

  it('calls onClick when the card is clicked', () => {
    const name = 'Luke Skywalker';
    const mockOnClick = vi.fn();

    render(<Card person={person} onPersonClick={mockOnClick} />);

    const card = screen.getByText(name);
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
