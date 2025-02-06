import { useState } from 'react';
import { useFetchData } from '../../hooks/useFetchData';
import { useQueryParams } from '../../hooks/useQueryParams';
import { Search } from '../../components/Search/Search';
import { Results } from '../../components/Results/Results';
import { Pagination } from '../../components/Pagination/Pagination';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton';
import { Details } from '../../components/Details/Details';
import styles from './HomePage.module.css';
import { Person } from '../../interfaces/person.interface.ts';

export const HomePage = () => {
  const { searchTerm, currentPage, updateQueryParams } = useQueryParams();
  const { peoples, loading, error, totalPages } = useFetchData(
    searchTerm,
    currentPage
  );
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handleSearch = (term: string) => {
    updateQueryParams(term, 1);
  };

  const handlePageChange = (page: number) => {
    updateQueryParams(searchTerm, page);
  };

  const handlePersonClick = (person: Person) => {
    setSelectedPerson(person);
    updateQueryParams(searchTerm, currentPage, person.name);
  };

  const handleCloseDetails = () => {
    setSelectedPerson(null);
    updateQueryParams(searchTerm, currentPage);
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
        {selectedPerson && (
          <Details
            person={selectedPerson}
            handleCloseDetails={handleCloseDetails}
          />
        )}
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
