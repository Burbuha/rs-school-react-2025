import { render, screen } from '@testing-library/react';
import { createMockRouter } from './utils/test-utils';
import { vi } from 'vitest';
import DetailsPage from '../pages/[name].tsx';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

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
        <DetailsPage
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
          error={null}
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

  it('renders error message when there is an error', () => {
    render(
      <RouterContext.Provider
        value={createMockRouter({ query: { name: 'Unknown' } })}
      >
        <DetailsPage details={null} error="Error fetching details" />
      </RouterContext.Provider>
    );

    expect(
      screen.getByText('Error: Error fetching details')
    ).toBeInTheDocument();
  });
});
