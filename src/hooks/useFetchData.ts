import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { useGetPeoplesQuery } from '../services/peopleApi.ts';

export const useFetchData = (term: string, page: number) => {
  const { data, error, isLoading } = useGetPeoplesQuery({ term, page });

  const handleError = (
    error: FetchBaseQueryError | SerializedError
  ): string => {
    if (error && 'status' in error && 'data' in error) {
      return error.data ? JSON.stringify(error.data) : 'An error occurred';
    } else if (error && 'message' in error && error.message) {
      return error.message;
    }

    return 'An unknown error occurred';
  };

  return {
    peoples: data?.results || [],
    loading: isLoading,
    error: error ? handleError(error) : null,
    totalPages: data?.count || 1,
  };
};
