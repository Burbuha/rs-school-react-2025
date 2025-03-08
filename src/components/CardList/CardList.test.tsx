import { render, screen, fireEvent } from '@testing-library/react';
import { CardList } from './CardList';
import { Person } from '../../interfaces/person.interface';
import { vi } from 'vitest';

vi.mock('../Card/Card.tsx', () => ({
  Card: ({
    person,
    onPersonClickAction,
  }: {
    person: Person;
    onPersonClickAction: (person: Person) => void;
  }) => (
    <div data-testid="mock-card" onClick={() => onPersonClickAction(person)}>
      <h3>{person.name}</h3>
    </div>
  ),
}));

describe('CardList Component', () => {
  const mockOnPersonClick = vi.fn();

  const mockItems: Person[] = [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
      birth_year: '19BBY',
      eye_color: 'blue',
      hair_color: 'blond',
      skin_color: 'fair',
    },
    {
      name: 'Leia Organa',
      height: '150',
      mass: '49',
      gender: 'female',
      birth_year: '19BBY',
      eye_color: 'brown',
      hair_color: 'brown',
      skin_color: 'light',
    },
  ];

  it('renders the correct number of Card components', () => {
    render(
      <CardList items={mockItems} onPersonClickAction={mockOnPersonClick} />
    );

    expect(screen.getAllByTestId('mock-card')).toHaveLength(mockItems.length);
  });

  it('displays "No data..." when there are no cards', () => {
    render(<CardList items={[]} onPersonClickAction={mockOnPersonClick} />);

    expect(screen.getByText('No data...')).toBeInTheDocument();
  });

  it('calls onPersonClick with the correct person when a card is clicked', () => {
    render(
      <CardList items={mockItems} onPersonClickAction={mockOnPersonClick} />
    );

    const lukeCard = screen.getByText('Luke Skywalker');
    fireEvent.click(lukeCard);

    expect(mockOnPersonClick).toHaveBeenCalledWith(mockItems[0]);
    expect(mockOnPersonClick).toHaveBeenCalledTimes(1);

    const leiaCard = screen.getByText('Leia Organa');
    fireEvent.click(leiaCard);

    expect(mockOnPersonClick).toHaveBeenCalledWith(mockItems[1]);
    expect(mockOnPersonClick).toHaveBeenCalledTimes(2);
  });
});
