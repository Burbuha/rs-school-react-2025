import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Search } from './Search';

describe('Search component', () => {
  it('should call onSearch with the correct search term when the Search button is clicked', () => {
    const onSearch = vi.fn();
    const initialSearchTerm = 'Luke';

    render(
      <Search onSearch={onSearch} initialSearchTerm={initialSearchTerm} />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialSearchTerm);

    fireEvent.change(input, { target: { value: 'Han Solo' } });

    const searchButton = screen.getByTestId('search');
    fireEvent.click(searchButton);

    expect(onSearch).toHaveBeenCalledWith('Han Solo');
  });

  it('should update the input value when typing', () => {
    const onSearch = vi.fn();
    const initialSearchTerm = '';

    render(
      <Search onSearch={onSearch} initialSearchTerm={initialSearchTerm} />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'Vader' } });

    expect(input).toHaveValue('Vader');
  });

  it('should have the correct initial value in the input field', () => {
    const onSearch = vi.fn();
    const initialSearchTerm = 'Yoda';

    render(
      <Search onSearch={onSearch} initialSearchTerm={initialSearchTerm} />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(initialSearchTerm);
  });
});
