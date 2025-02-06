import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const page = parseInt(params.get('page') || '1', 10);
    const details = params.get('details');

    setSearchTerm(search);
    setCurrentPage(page);
    setDetails(details);
  }, [location.search]);

  const updateQueryParams = (
    search: string,
    page: number,
    details?: string
  ) => {
    const params = new URLSearchParams();

    if (search) {
      params.set('search', search);
    }

    if (page) {
      params.set('page', page.toString());
    }

    if (details) {
      params.set('details', details);
    }

    navigate(`/?${params.toString()}`);
  };

  return { searchTerm, currentPage, details, updateQueryParams };
};
