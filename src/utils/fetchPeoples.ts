import { Person } from '../interfaces/person.interface';

export const fetchPeoples = async (
  searchTerm: string,
  page: number
): Promise<{ peoples: Person[]; error: string | null; count: number }> => {
  try {
    const params = searchTerm
      ? `/?search=${searchTerm}&page=${page}`
      : `/?page=${page}`;
    const response = await fetch(`https://swapi.dev/api/people${params}`);
    const data = await response.json();

    return { peoples: data.results, error: data.error, count: data.count };
  } catch {
    return { peoples: [], error: 'Failed to fetch data', count: 0 };
  }
};
