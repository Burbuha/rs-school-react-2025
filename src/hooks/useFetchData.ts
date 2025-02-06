import { useState, useEffect } from 'react';
import { Person } from '../interfaces/person.interface';

const API_URL = 'https://swapi.dev/api/people';

export const useFetchData = (term: string, page: number) => {
  const [peoples, setPeoples] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const query = term.trim();
      const url = query
        ? `${API_URL}/?search=${query}&page=${page}`
        : `${API_URL}/?page=${page}`;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          if (response.status >= 400 && response.status < 500) {
            throw new Error(
              `Client Error: ${response.status} ${response.statusText}`
            );
          } else if (response.status >= 500 && response.status < 600) {
            throw new Error(
              `Server Error: ${response.status} ${response.statusText}`
            );
          } else {
            throw new Error('Failed to fetch data');
          }
        }

        const data = await response.json();

        const peoples = data.results.slice(0, 10).map((person: Person) => ({
          name: person.name,
          gender: person.gender,
          height: person.height,
          mass: person.mass,
          birth_year: person.birth_year,
          eye_color: person.eye_color,
          hair_color: person.hair_color,
          skin_color: person.skin_color,
        }));

        setPeoples(peoples);
        setLoading(false);
        setTotalPages(Math.ceil(data.count / 10));
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          setLoading(false);
        } else {
          setError('An unknown error occurred');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [term, page]);

  return { peoples, loading, error, totalPages };
};
