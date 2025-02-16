import { useGetPeoplesQuery } from '../services/peopleApi.ts';

export const useFetchData = (term: string, page: number) => {
  const { data, error, isLoading } = useGetPeoplesQuery({ term, page });

  return {
    peoples: data?.results || [],
    loading: isLoading,
    error: error || null,
    totalPages: data?.count || 1,
  };
};
