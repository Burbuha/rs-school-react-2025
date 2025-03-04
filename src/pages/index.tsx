import { useQueryParams } from '../hooks/useQueryParams';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import { RootState } from '../store/store';
import { useTheme } from '../context/ThemeContext';
import { Person } from '../interfaces/person.interface';
import { unselectAll } from '../store/slices/selectedItemsSlice';
import { ToggleButton } from '../components/ToggleButton/ToggleButton';
import { Search } from '../components/Search/Search';
import { Results } from '../components/Results/Results';
import { Pagination } from '../components/Pagination/Pagination';
import { DownloadButton } from '../components/DownloadButton/DownloadButton';
import { getServerSideProps as getResultsServerSideProps } from '../utils/getResultsServerSideProps';
import styles from '../styles/HomePage.module.css';

interface Props {
  initialSearchTerm: string;
  initialPage: number;
  peoples: Person[];
  error: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resultsProps = (await getResultsServerSideProps(context)) as {
    props: { peoples: Person[]; error: string | null; totalPages: number };
  };
  const initialSearchTerm = context.query.searchTerm || '';
  const initialPage = parseInt(context.query.page as string, 10) || 1;

  return {
    props: {
      initialSearchTerm,
      initialPage,
      ...resultsProps.props,
    },
  };
};

export const HomePage = ({
  initialSearchTerm,
  initialPage,
  peoples,
  error,
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
          <Search onSearch={handleSearch} />
        </div>

        <div className={styles.results}>
          <Results
            peoples={peoples}
            error={error}
            onPersonClick={handlePersonClick}
          />
        </div>

        <div className={styles.footer}>
          <Pagination onPageChange={handlePageChange} totalPages={10} />

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
