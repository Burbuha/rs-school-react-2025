import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import * as ReactRouterDom from 'react-router-dom';
import { Pagination } from './Pagination';

vi.mock('react-router-dom', async () => {
  const actualReactRouterDom =
    await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actualReactRouterDom,
    useNavigate: vi.fn(),
  };
});

describe('Pagination Component', () => {
  it('should disable the "Previous" button when on the first page', () => {
    const currentPage = 1;
    const totalPages = 5;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => {}}
      />
    );

    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('should disable the "Next" button when on the last page', () => {
    const currentPage = 5;
    const totalPages = 5;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => {}}
      />
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should enable both buttons when on a middle page', () => {
    const currentPage = 3;
    const totalPages = 5;

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => {}}
      />
    );

    const previousButton = screen.getByText('Previous');
    const nextButton = screen.getByText('Next');

    expect(previousButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
  });
});
