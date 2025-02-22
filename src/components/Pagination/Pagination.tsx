import styles from './Pagination.module.css';
import { useQueryParams } from '../../hooks/useQueryParams.ts';
import { useFetchData } from '../../hooks/useFetchData.ts';

interface Props {
  onPageChange: (page: number) => void;
}

export const Pagination = ({ onPageChange }: Props) => {
  const { searchTerm, currentPage } = useQueryParams();
  const { totalPages } = useFetchData(searchTerm, currentPage);

  return (
    <div className={styles.pagination} data-testid="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
