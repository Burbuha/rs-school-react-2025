import { Outlet } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
import { useQueryParams } from '../../hooks/useQueryParams';
import { Search } from '../../components/Search/Search';
import { Results } from '../../components/Results/Results';
import { Pagination } from '../../components/Pagination/Pagination';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton';
import styles from './HomePage.module.css';
import { Person } from '../../interfaces/person.interface.ts';

export const HomePage = () => {
  const { searchTerm, currentPage, updateQueryParams } = useQueryParams();
  const { peoples, loading, error, totalPages } = useFetchData(
    searchTerm,
    currentPage
  );

  const handleSearch = (term: string) => {
    updateQueryParams(term, 1);
  };

  const handlePageChange = (page: number) => {
    updateQueryParams(searchTerm, page);
  };

  const handlePersonClick = (person: Person) => {
    updateQueryParams(searchTerm, currentPage, person.name);
  };

  return (
    <div className={styles.main}>
      <h1>Characters within the Star Wars universe</h1>
      <div className={styles.topControls}>
        <Search onSearch={handleSearch} initialSearchTerm={searchTerm} />
      </div>
      <div className={styles.results}>
        <Results
          peoples={peoples}
          loading={loading}
          error={error}
          onPersonClick={handlePersonClick}
        />
        <Outlet />
      </div>
      <div className={styles.footer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <ErrorButton />
      </div>
    </div>
  );
};
