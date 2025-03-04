import { render, screen, fireEvent } from '@testing-library/react';
import { Results } from './Results';
import { store } from '../../store/store';
import { Person } from '../../interfaces/person.interface';
import { Provider } from 'react-redux';

describe('Results Component', () => {
  const mockOnPersonClick = vi.fn();
  const mockPeoples: Person[] = [
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

  it('renders the relevant card data', () => {
    render(
      <Provider store={store}>
        <Results
          peoples={mockPeoples}
          error={null}
          onPersonClick={mockOnPersonClick}
        />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows an error message when there is an error', () => {
    const errorMessage = 'Something went wrong';

    render(
      <Provider store={store}>
        <Results
          peoples={[]}
          error={errorMessage}
          onPersonClick={mockOnPersonClick}
        />
      </Provider>
    );

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('calls onPersonClick when a card is clicked', () => {
    render(
      <Provider store={store}>
        <Results
          peoples={mockPeoples}
          error={null}
          onPersonClick={mockOnPersonClick}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(mockOnPersonClick).toHaveBeenCalledWith(mockPeoples[0]);

    fireEvent.click(screen.getByText('Leia Organa'));
    expect(mockOnPersonClick).toHaveBeenCalledWith(mockPeoples[1]);
  });
});
