import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders the NotFoundPage component', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Go Home/i)).toBeInTheDocument();
  });
});
