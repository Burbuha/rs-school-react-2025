import { Outlet } from 'react-router-dom';
import { useFetchData } from '../../hooks/useFetchData';
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

export const HomePage = () => {
  const { searchTerm, currentPage, updateQueryParams } = useQueryParams();
  const { peoples, loading, error, totalPages } = useFetchData(
    searchTerm,
    currentPage
  );
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const { theme, toggleTheme } = useTheme();

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

  const handleDownload = () => {
    const csvContent = selectedItems
      .map(
        (item) =>
          `${item.name},${item.birth_year},${item.gender},${item.height},${item.mass}`
      )
      .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={`main ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Characters within the Star Wars universe</h1>
          <ToggleButton onClick={toggleTheme} />
        </div>

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

          {selectedItems.length > 0 && (
            <div className={styles.flyout}>
              <span>{selectedItems.length} items are selected</span>
              <button onClick={handleUnselectAll}>Unselect all</button>
              <button onClick={handleDownload}>Download</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
