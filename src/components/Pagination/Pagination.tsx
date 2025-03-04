import { useQueryParams } from '../../hooks/useQueryParams.ts';
import styles from './Pagination.module.css';

interface Props {
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination = ({ onPageChange, totalPages }: Props) => {
  const { currentPage } = useQueryParams();

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
