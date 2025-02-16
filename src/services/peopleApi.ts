import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Person } from '../interfaces/person.interface';

const API_URL = 'https://swapi.dev/api/people';

export const peopleApi = createApi({
  reducerPath: 'peopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getPeoples: builder.query<
      { results: Person[]; count: number },
      { term: string; page: number }
    >({
      query: ({ term, page }) => {
        const query = term.trim();

        return query ? `/?search=${query}&page=${page}` : `/?page=${page}`;
      },
      transformResponse: (response: { results: Person[]; count: number }) => {
        const peoples = response.results.map((person: Person) => ({
          name: person.name,
          gender: person.gender,
          height: person.height,
          mass: person.mass,
          birth_year: person.birth_year,
          eye_color: person.eye_color,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
        }));

        return {
          results: peoples,
          count: response.count,
        };
      },
    }),
  }),
});

export const { useGetPeoplesQuery } = peopleApi;
