import { render, screen } from '@testing-library/react';
import { createMockRouter } from './utils/test-utils';
import { vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import DetailsPageClient from '../components/DetailsPageClient/DetailsPageClient';

vi.mock('../utils/getDetailsServerSideProps', () => ({
  getDetailsServerSideProps: vi.fn().mockResolvedValue({
    props: {
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
      error: null,
    },
  }),
}));

describe('DetailsPage', () => {
  it('renders the DetailsPage component with person details', async () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { name: 'Luke Skywalker' } })}
      >
        <DetailsPageClient
          details={{
            name: 'Luke Skywalker',
            birth_year: '19BBY',
            gender: 'male',
            height: '172',
            mass: '77',
            eye_color: 'blue',
            hair_color: 'blond',
            skin_color: 'fair',
          }}
          search={''}
          currentPage={1}
        />
      </RouterContext.Provider>
    );

    expect(await screen.findByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Birth year: 19BBY')).toBeInTheDocument();
    expect(screen.getByText('Gender: male')).toBeInTheDocument();
    expect(screen.getByText('Height: 172cm')).toBeInTheDocument();
    expect(screen.getByText('Mass: 77kg')).toBeInTheDocument();
    expect(screen.getByText('Eye color: blue')).toBeInTheDocument();
    expect(screen.getByText('Hair color: blond')).toBeInTheDocument();
    expect(screen.getByText('Skin color: fair')).toBeInTheDocument();
  });
});
