import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useLocalStorage } from './useLocalStorage';

export const useQueryParams = () => {
  const router = useRouter();
  const { storedValue: searchTerm, setValue: setSearchTerm } = useLocalStorage(
    'searchTerm',
    ''
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const { query, page } = router.query;
    const search = typeof query === 'string' ? query : '';
    const currentPage = parseInt(typeof page === 'string' ? page : '1', 10);

    setSearchTerm(search);
    setCurrentPage(currentPage);
  }, [router.query, setSearchTerm]);

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

  useEffect(() => {
    if (window.location.pathname === '/') {
      updateQueryParams(searchTerm, currentPage);
    }
  }, [currentPage, searchTerm, updateQueryParams]);

  return { searchTerm, currentPage, updateQueryParams };
};
