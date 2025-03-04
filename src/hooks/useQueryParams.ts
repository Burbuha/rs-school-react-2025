import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from './useLocalStorage';

export const useQueryParams = (
  initialSearchTerm: string = '',
  initialPage: number = 1
) => {
  const router = useRouter();
  const { storedValue: searchTerm, setValue: setSearchTerm } = useLocalStorage(
    'searchTerm',
    initialSearchTerm
  );
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const { query, page } = router.query;
    const search = typeof query === 'string' ? query : initialSearchTerm;
    const pageNumber = parseInt(
      typeof page === 'string' ? page : initialPage.toString(),
      10
    );

    setSearchTerm(search);
    setCurrentPage(pageNumber);
  }, [router.query, setSearchTerm, initialSearchTerm, initialPage]);

  const updateQueryParams = useCallback(
    (search: string, page: number, name?: string) => {
      const params = new URLSearchParams();

      if (search) params.set('query', search);
      if (page) params.set('page', page.toString());

      const newUrl = name
        ? `/${name}?${params.toString()}`
        : `/?${params.toString()}`;

      router.push(newUrl);
    },
    [router]
  );

  return { searchTerm, currentPage, updateQueryParams };
};
