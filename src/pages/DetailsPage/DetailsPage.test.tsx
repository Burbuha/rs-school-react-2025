import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DetailsPage } from './DetailsPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDetails } from '../../hooks/useFetchDetails';
import { Mock } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../../hooks/useFetchDetails');

describe('DetailsPage', () => {
  const mockUseNavigate = useNavigate as Mock;
  const mockUseParams = useParams as Mock;
  const mockUseFetchDetails = useFetchDetails as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseParams.mockReturnValue({ name: 'Luke' });
    mockUseFetchDetails.mockReturnValue({
      details: null,
      loading: true,
      error: null,
    });

    render(<DetailsPage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseParams.mockReturnValue({ name: 'Luke' });
    mockUseFetchDetails.mockReturnValue({
      details: null,
      loading: false,
      error: 'Something went wrong',
    });

    render(<DetailsPage />);

    expect(
      screen.getByText(/Error: Something went wrong/i)
    ).toBeInTheDocument();
  });

  it('renders character details correctly', () => {
    mockUseParams.mockReturnValue({ name: 'Luke' });
    mockUseFetchDetails.mockReturnValue({
      details: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        eye_color: 'blue',
        hair_color: 'blond',
        skin_color: 'fair',
      },
      loading: false,
      error: null,
    });

    render(<DetailsPage />);

    expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    expect(screen.getByText(/Birth year: 19BBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
    expect(screen.getByText(/Height: 172cm/i)).toBeInTheDocument();
    expect(screen.getByText(/Mass: 77kg/i)).toBeInTheDocument();
    expect(screen.getByText(/Eye color: blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Hair color: blond/i)).toBeInTheDocument();
    expect(screen.getByText(/Skin color: fair/i)).toBeInTheDocument();
  });

  it('navigates to the home page when close button is clicked', () => {
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseParams.mockReturnValue({ name: 'Luke' });
    mockUseFetchDetails.mockReturnValue({
      details: {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        eye_color: 'blue',
        hair_color: 'blond',
        skin_color: 'fair',
      },
      loading: false,
      error: null,
    });

    render(<DetailsPage />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/?query=&page=1');
  });

  it('redirects to /not-found when details are not found', async () => {
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseParams.mockReturnValue({ name: 'Luke' });
    mockUseFetchDetails.mockReturnValue({
      details: null,
      loading: false,
      error: null,
    });

    render(<DetailsPage />);

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith('/not-found', { replace: true })
    );
  });
});
