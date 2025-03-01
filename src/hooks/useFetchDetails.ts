import { useRouter } from 'next/router';
import { handleApiError } from '../utils/handleApiError';
import { useGetPersonDetailsQuery } from '../services/peopleApi.ts';

export const useFetchDetails = (name: string) => {
  const router = useRouter();
  const { data, error, isLoading } = useGetPersonDetailsQuery(name);

  return {
    details: data || null,
    loading: isLoading,
    error: error ? handleApiError(error, router) : null,
  };
};
