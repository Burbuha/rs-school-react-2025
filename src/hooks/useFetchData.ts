import { useRouter } from 'next/router';
import { handleApiError } from '../utils/handleApiError';
import { useGetPeoplesQuery } from '../services/peopleApi.ts';

export const useFetchData = (term: string, page: number) => {
  const router = useRouter();
  const { data, error, isLoading } = useGetPeoplesQuery({ term, page });

  return {
    peoples: data?.results || [],
    loading: isLoading,
    error: error ? handleApiError(error, router) : null,
    totalPages: data?.count || 1,
  };
};
