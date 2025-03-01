import { useQueryParams } from '../hooks/useQueryParams';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/HomePage.module.css';
import { RootState } from '../store/store.ts';
import { useTheme } from '../context/ThemeContext.tsx';
import { Person } from '../interfaces/person.interface.ts';
import { unselectAll } from '../store/slices/selectedItemsSlice.ts';
import { ToggleButton } from '../components/ToggleButton/ToggleButton.tsx';
import { Search } from '../components/Search/Search.tsx';
import { Results } from '../components/Results/Results.tsx';
import { Pagination } from '../components/Pagination/Pagination.tsx';
import { DownloadButton } from '../components/DownloadButton/DownloadButton.tsx';

export const HomePage = () => {
  const { searchTerm, currentPage, updateQueryParams } = useQueryParams();
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
          <Search onSearch={handleSearch} />
        </div>

        <div className={styles.results}>
          <Results onPersonClick={handlePersonClick} />
        </div>

        <div className={styles.footer}>
          <Pagination onPageChange={handlePageChange} />

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

export default HomePage;
