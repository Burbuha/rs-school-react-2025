import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { vi, Mock } from 'vitest';
import * as hooks from '../../hooks/useFetchData';
import * as queryParams from '../../hooks/useQueryParams';

vi.mock('../../hooks/useFetchData');
vi.mock('../../hooks/useQueryParams');

describe('HomePage', () => {
  const mockUpdateQueryParams = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the page correctly', () => {
    (queryParams.useQueryParams as Mock).mockReturnValue({
      searchTerm: '',
      currentPage: 1,
      updateQueryParams: mockUpdateQueryParams,
    });

    (hooks.useFetchData as Mock).mockReturnValue({
      peoples: [],
      loading: false,
      error: null,
      totalPages: 1,
    });

    render(<HomePage />);

    expect(
      screen.getByText(/Characters within the Star Wars universe/)
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('calls updateQueryParams when a search term is entered', async () => {
    (queryParams.useQueryParams as Mock).mockReturnValue({
      searchTerm: '',
      currentPage: 1,
      updateQueryParams: mockUpdateQueryParams,
    });

    (hooks.useFetchData as Mock).mockReturnValue({
      peoples: [],
      loading: false,
      error: null,
      totalPages: 1,
    });

    render(<HomePage />);

    const searchInput = screen.getByRole('textbox');
    const searchButton = screen.getByTestId('search');

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(mockUpdateQueryParams).toHaveBeenCalledWith('Luke', 1)
    );
  });

  it('calls updateQueryParams when pagination page is changed', async () => {
    (queryParams.useQueryParams as Mock).mockReturnValue({
      searchTerm: 'Luke',
      currentPage: 1,
      updateQueryParams: mockUpdateQueryParams,
    });

    (hooks.useFetchData as Mock).mockReturnValue({
      peoples: [],
      loading: false,
      error: null,
      totalPages: 5,
    });

    render(<HomePage />);

    const page2Button = screen.getByText(/Next/);
    fireEvent.click(page2Button);

    await waitFor(() =>
      expect(mockUpdateQueryParams).toHaveBeenCalledWith('Luke', 2)
    );
  });

  it('shows error button when there is an error in data fetching', () => {
    (queryParams.useQueryParams as Mock).mockReturnValue({
      searchTerm: '',
      currentPage: 1,
      updateQueryParams: mockUpdateQueryParams,
    });

    (hooks.useFetchData as Mock).mockReturnValue({
      peoples: [],
      loading: false,
      error: 'Something went wrong',
      totalPages: 1,
    });

    render(<HomePage />);

    expect(
      screen.getByRole('button', { name: /Throw Error/i })
    ).toBeInTheDocument();
  });

  it('renders loading state when fetching data', () => {
    (queryParams.useQueryParams as Mock).mockReturnValue({
      searchTerm: '',
      currentPage: 1,
      updateQueryParams: mockUpdateQueryParams,
    });

    (hooks.useFetchData as Mock).mockReturnValue({
      peoples: [],
      loading: true,
      error: null,
      totalPages: 1,
    });

    render(<HomePage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
