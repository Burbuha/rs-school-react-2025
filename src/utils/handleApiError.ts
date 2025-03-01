import { useRouter } from 'next/router';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const handleApiError = (
  error: FetchBaseQueryError | SerializedError,
  router: ReturnType<typeof useRouter>
): string => {
  if (error && 'status' in error) {
    if (error.status === 404) {
      router.push('/404');
      return 'Page not found';
    }

    return error.data ? JSON.stringify(error.data) : 'An error occurred';
  } else if (error && 'message' in error) {
    return error.message as string;
  }
  return 'An unknown error occurred';
};
