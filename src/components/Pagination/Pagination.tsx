'use client';

import { useQueryParams } from '../../hooks/useQueryParams.ts';
import styles from './Pagination.module.css';

interface Props {
  onPageChangeAction: (page: number) => void;
  totalPages: number;
}

export const Pagination = ({ onPageChangeAction, totalPages }: Props) => {
  const { currentPage } = useQueryParams();

  return (
    <div className={styles.pagination} data-testid="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChangeAction(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChangeAction(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
