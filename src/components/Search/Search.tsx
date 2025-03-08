'use client';

import { ChangeEvent, useState } from 'react';

import styles from './Search.module.css';
import { useQueryParams } from '../../hooks/useQueryParams.ts';

interface Props {
  onSearchAction: (term: string) => void;
}

export const Search = ({ onSearchAction }: Props) => {
  const { searchTerm: initialSearchTerm } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearchAction(searchTerm);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button data-testid="search" onClick={handleSearchClick}>
        Search
      </button>
    </div>
  );
};
