import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';

import { Results } from './Results';
import { Card } from '../Card/Card';
import { Person } from '../../interfaces/person.interface.ts';
import { store } from '../../store/store.ts';
import * as useQueryParams from '../../hooks/useQueryParams.ts';
import * as useFetchData from '../../hooks/useFetchData.ts';

vi.mock('../CardList/CardList.tsx', () => ({
  CardList: ({
    items,
    onPersonClick,
  }: {
    items: Person[];
    onPersonClick: (person: Person) => void;
  }) => (
    <div>
      {items.map((person) => (
        <Card
          key={person.name}
          person={person}
          onPersonClick={() => onPersonClick(person)}
        />
      ))}
    </div>
  ),
}));

vi.mock('../../components/Loader/Loader.tsx', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

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
    vi.spyOn(useQueryParams, 'useQueryParams').mockReturnValue({
      searchTerm: 'Luke',
      currentPage: 1,
      updateQueryParams: vi.fn(),
    });
    vi.spyOn(useFetchData, 'useFetchData').mockReturnValue({
      peoples: mockPeoples,
      loading: false,
      error: null,
      totalPages: 5,
    });

    render(
      <Provider store={store}>
        <Results onPersonClick={mockOnPersonClick} />
      </Provider>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('shows the Loader component when loading', () => {
    vi.spyOn(useQueryParams, 'useQueryParams').mockReturnValue({
      searchTerm: 'Luke',
      currentPage: 1,
      updateQueryParams: vi.fn(),
    });
    vi.spyOn(useFetchData, 'useFetchData').mockReturnValue({
      peoples: [],
      loading: true,
      error: null,
      totalPages: 5,
    });

    render(
      <Provider store={store}>
        <Results onPersonClick={mockOnPersonClick} />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    const errorMessage = 'Something went wrong';

    vi.spyOn(useQueryParams, 'useQueryParams').mockReturnValue({
      searchTerm: 'Luke',
      currentPage: 1,
      updateQueryParams: vi.fn(),
    });
    vi.spyOn(useFetchData, 'useFetchData').mockReturnValue({
      peoples: [],
      loading: false,
      error: errorMessage,
      totalPages: 5,
    });

    render(
      <Provider store={store}>
        <Results onPersonClick={mockOnPersonClick} />
      </Provider>
    );

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('calls onPersonClick when a card is clicked', async () => {
    vi.spyOn(useQueryParams, 'useQueryParams').mockReturnValue({
      searchTerm: 'Luke',
      currentPage: 1,
      updateQueryParams: vi.fn(),
    });
    vi.spyOn(useFetchData, 'useFetchData').mockReturnValue({
      peoples: mockPeoples,
      loading: false,
      error: null,
      totalPages: 5,
    });

    render(
      <Provider store={store}>
        <Results onPersonClick={mockOnPersonClick} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));

    expect(mockOnPersonClick).toHaveBeenCalledWith(mockPeoples[0]);
    expect(mockOnPersonClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Leia Organa'));

    expect(mockOnPersonClick).toHaveBeenCalledWith(mockPeoples[1]);
    expect(mockOnPersonClick).toHaveBeenCalledTimes(2);
  });

  it('triggers an additional API call when a card is clicked', async () => {
    const mockApiCall = vi.fn();

    vi.spyOn(useQueryParams, 'useQueryParams').mockReturnValue({
      searchTerm: 'Luke',
      currentPage: 1,
      updateQueryParams: vi.fn(),
    });
    vi.spyOn(useFetchData, 'useFetchData').mockReturnValue({
      peoples: mockPeoples,
      loading: false,
      error: null,
      totalPages: 5,
    });

    render(
      <Provider store={store}>
        <Results onPersonClick={(person) => mockApiCall(person)} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));

    await waitFor(() =>
      expect(mockApiCall).toHaveBeenCalledWith(mockPeoples[0])
    );
    expect(mockApiCall).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Leia Organa'));

    await waitFor(() =>
      expect(mockApiCall).toHaveBeenCalledWith(mockPeoples[1])
    );
    expect(mockApiCall).toHaveBeenCalledTimes(2);
  });
});
