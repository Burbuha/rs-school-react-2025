'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = (
  initialSearchTerm: string = '',
  initialPage: number = 1
) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  useEffect(() => {
    const query = searchParams.get('query') || initialSearchTerm;
    const page = parseInt(
      searchParams.get('page') || initialPage.toString(),
      10
    );

    setSearchTerm(query);
    setCurrentPage(page);
  }, [searchParams, setSearchTerm, initialSearchTerm, initialPage]);

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
