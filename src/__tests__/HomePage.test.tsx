import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AppProviders } from '../context/AppProviders';
import HomePageClient from '../components/HomePageClient/HomePageClient';
import { Person } from '../interfaces/person.interface';
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

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
  count: 5,
};

describe('HomePage', () => {
  it('renders the HomePageClient component', () => {
    render(
      <Provider store={store}>
        <AppProviders>
          <MemoryRouterProvider>
            <HomePageClient {...mockProps} />
          </MemoryRouterProvider>
        </AppProviders>
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
        <AppProviders>
          <MemoryRouterProvider>
            <HomePageClient {...mockProps} />
          </MemoryRouterProvider>
        </AppProviders>
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
        <AppProviders>
          <MemoryRouterProvider>
            <HomePageClient {...mockProps} />
          </MemoryRouterProvider>
        </AppProviders>
      </Provider>
    );

    const nextPageButton = screen.getByText('Next');
    fireEvent.click(nextPageButton);
  });
});
