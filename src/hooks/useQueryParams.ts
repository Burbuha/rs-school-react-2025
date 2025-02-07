import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage.ts';

export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('query') || '';
    const page = parseInt(params.get('page') || '1', 10);

    setSearchTerm(search);
    setCurrentPage(page);
  }, [location.search, setSearchTerm]);

  const updateQueryParams = (search: string, page: number, name?: string) => {
    const params = new URLSearchParams();

    if (search) params.set('query', search);
    if (page) params.set('page', page.toString());

    if (name) {
      navigate(`/${name}?${params.toString()}`);
    } else {
      navigate(`/?${params.toString()}`);
    }
  };

  return { searchTerm, currentPage, updateQueryParams };
};
