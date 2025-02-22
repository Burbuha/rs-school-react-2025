import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';
import { useQueryParams } from '../../hooks/useQueryParams.ts';
import { useFetchData } from '../../hooks/useFetchData.ts';
import { Mock, vi } from 'vitest';

vi.mock('../../hooks/useQueryParams.ts');
vi.mock('../../hooks/useFetchData.ts');

describe('Pagination Component', () => {
  const onPageChangeMock = vi.fn();

  beforeEach(() => {
    (useQueryParams as Mock).mockReturnValue({
      searchTerm: 'test',
      currentPage: 1,
    });
    (useFetchData as Mock).mockReturnValue({
      totalPages: 5,
    });
  });

  it('renders pagination with correct page info and buttons', () => {
    render(<Pagination onPageChange={onPageChangeMock} />);

    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();

    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  it('disables "Previous" button when on the first page', () => {
    render(<Pagination onPageChange={onPageChangeMock} />);

    const prevButton = screen.getByText('Previous');
    expect(prevButton).toBeDisabled();
  });

  it('disables "Next" button when on the last page', () => {
    (useQueryParams as Mock).mockReturnValue({
      searchTerm: 'test',
      currentPage: 5,
    });

    render(<Pagination onPageChange={onPageChangeMock} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when next button is clicked', () => {
    render(<Pagination onPageChange={onPageChangeMock} />);

    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when previous button is clicked', () => {
    (useQueryParams as Mock).mockReturnValue({
      searchTerm: 'test',
      currentPage: 2,
    });

    render(<Pagination onPageChange={onPageChangeMock} />);

    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChangeMock).toHaveBeenCalledWith(1);
  });
});
