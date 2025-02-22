import { render, fireEvent, screen } from '@testing-library/react';
import { DownloadButton } from './DownloadButton';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { Person } from '../../interfaces/person.interface';

const mockStore = (selectedItems: Person[]) =>
  configureStore({
    reducer: {
      selectedItems: () => ({ items: selectedItems }),
    },
  });

describe('DownloadButton', () => {
  it('renders the button correctly', () => {
    const store = mockStore([]);
    render(
      <Provider store={store}>
        <DownloadButton />
      </Provider>
    );
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('triggers a download with the correct CSV content and filename', async () => {
    const selectedItems = [
      {
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        height: '172',
        mass: '77',
        eye_color: 'blue',
        hair_color: 'blond',
        skin_color: 'fair',
      },
      {
        name: 'Darth Vader',
        birth_year: '41.9BBY',
        gender: 'male',
        height: '202',
        mass: '136',
        eye_color: 'yellow',
        hair_color: 'none',
        skin_color: 'white',
      },
    ];

    const store = mockStore(selectedItems);

    const createObjectURLMock = vi.fn(() => '#fake-url');
    const revokeObjectURLMock = vi.fn();

    Object.defineProperty(window, 'location', {
      value: { assign: vi.fn() },
      writable: true,
    });

    window.URL.createObjectURL = createObjectURLMock;
    window.URL.revokeObjectURL = revokeObjectURLMock;

    render(
      <Provider store={store}>
        <DownloadButton />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    expect(createObjectURLMock).toHaveBeenCalled();

    const link = screen.getByTestId('link') as HTMLAnchorElement;

    expect(link.download).toBe('2_items.csv');

    const expectedCSV = [
      'Name,Birth year,Gender,Height,Mass,Eye color,Hair color,Skin color',
      '"Luke Skywalker","19BBY","male","172","77","blue","blond","fair"',
      '"Darth Vader","41.9BBY","male","202","136","yellow","none","white"',
    ].join('\n');
    const blob = new Blob([expectedCSV], { type: 'text/csv' });

    expect(createObjectURLMock).toHaveBeenCalledWith(blob);

    expect(revokeObjectURLMock).toHaveBeenCalled();
  });
});
