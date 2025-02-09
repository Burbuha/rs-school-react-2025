import { useState, useEffect } from 'react';
import { Person } from '../interfaces/person.interface';

export const useFetchDetails = (name: string) => {
  const [details, setDetails] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${name}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        setDetails(result.results[0]);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);

  return { details, loading, error };
};
