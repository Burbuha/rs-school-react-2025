import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { Search } from './Search';
import { useQueryParams } from '../../hooks/useQueryParams.ts';

vi.mock('../../hooks/useQueryParams.ts');

describe('Search component', () => {
  (useQueryParams as Mock).mockReturnValue({
    searchTerm: 'Luke',
    currentPage: 1,
  });

  it('should call onSearch with the correct search term when the Search button is clicked', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Luke');

    fireEvent.change(input, { target: { value: 'Han Solo' } });

    const searchButton = screen.getByTestId('search');
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith('Han Solo');
  });

  it('should update the input value when typing', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Luke');

    fireEvent.change(input, { target: { value: 'Vader' } });

    expect(input).toHaveValue('Vader');
  });

  it('should have the correct initial value in the input field', () => {
    const onSearch = vi.fn();

    render(<Search onSearch={onSearch} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Luke');
  });
});
