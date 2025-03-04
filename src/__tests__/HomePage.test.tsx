import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import HomePage from '../pages/index';
import { Person } from '../interfaces/person.interface';
import { createMockRouter } from './utils/test-utils.ts';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { ThemeProvider } from '../context/ThemeProvider.tsx';

const mockPeoples: Person[] = [
  {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    gender: 'male',
    height: '',
    mass: '',
    eye_color: '',
    hair_color: '',
    skin_color: '',
  },
  {
    name: 'Darth Vader',
    birth_year: '41.9BBY',
    gender: 'male',
    height: '',
    mass: '',
    eye_color: '',
    hair_color: '',
    skin_color: '',
  },
];

const mockProps = {
  initialSearchTerm: '',
  initialPage: 1,
  peoples: mockPeoples,
  error: null,
};

describe('HomePage', () => {
  it('renders the HomePage component', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={createMockRouter({ query: {} })}>
          <ThemeProvider>
            <HomePage {...mockProps} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    expect(
      screen.getByText('Characters within the Star Wars universe')
    ).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('handles search input', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={createMockRouter({ query: {} })}>
          <ThemeProvider>
            <HomePage {...mockProps} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText('Search...');
    const searchButton = screen.getByTestId('search');

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  it('handles pagination', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={createMockRouter({ query: {} })}>
          <ThemeProvider>
            <HomePage {...mockProps} />
          </ThemeProvider>
        </RouterContext.Provider>
      </Provider>
    );

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);
  });
});
