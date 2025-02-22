import { Outlet } from 'react-router-dom';
import { useQueryParams } from '../../hooks/useQueryParams';
import { Search } from '../../components/Search/Search';
import { Results } from '../../components/Results/Results';
import { Pagination } from '../../components/Pagination/Pagination';
import { Person } from '../../interfaces/person.interface.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import { unselectAll } from '../../store/slices/selectedItemsSlice.ts';
import { useTheme } from '../../context/ThemeContext.tsx';
import styles from './HomePage.module.css';
import { ToggleButton } from '../../components/ToggleButton/ToggleButton.tsx';
import { DownloadButton } from '../../components/DownloadButton/DownloadButton.tsx';

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
          <Outlet />
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
