'use client';

import { ReactElement } from 'react';
import { Person } from '../../interfaces/person.interface';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useTheme } from '../../context/ThemeContext';
import { unselectAll } from '../../store/slices/selectedItemsSlice';
import { ToggleButton } from '../ToggleButton/ToggleButton';
import { Search } from '../Search/Search';
import { Results } from '../Results/Results';
import { Pagination } from '../Pagination/Pagination';
import { DownloadButton } from '../DownloadButton/DownloadButton';
import styles from './HomePageClient.module.css';

interface Props {
  initialSearchTerm: string;
  initialPage: number;
  peoples: Person[];
  error: string | null;
  count: number;
  children: ReactElement;
}

const HomePageClient = ({
  initialSearchTerm,
  initialPage,
  peoples,
  error,
  count,
  children,
}: Props) => {
  const { searchTerm, currentPage, updateQueryParams } = useQueryParams(
    initialSearchTerm,
    initialPage
  );
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const { theme } = useTheme();

  const handleSearch = (term: string) => {
    updateQueryParams(term, 1);
  };

  const handlePageChange = (page: number) => {
    updateQueryParams(searchTerm, page);
  };

  const handlePersonClick = (person: Person) => {
    updateQueryParams(searchTerm, currentPage, person.name);
  };

  const handleUnselectAll = () => {
    dispatch(unselectAll());
  };

  return (
    <div className={`main ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Characters within the Star Wars universe</h1>
          <ToggleButton />
        </div>

        <div className={styles.topControls}>
          <Search onSearchAction={handleSearch} />
        </div>

        <div className={styles.results}>
          <Results
            peoples={peoples}
            error={error}
            onPersonClickAction={handlePersonClick}
          />
          {children}
        </div>

        <div className={styles.footer}>
          <Pagination
            onPageChangeAction={handlePageChange}
            totalPages={Math.ceil(count / 10)}
          />

          {selectedItems.length > 0 && (
            <div className={styles.flyout}>
              <span>{selectedItems.length} items are selected</span>
              <button onClick={handleUnselectAll}>Unselect all</button>
              <DownloadButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePageClient;
