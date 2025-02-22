import { ChangeEvent, useState } from 'react';

import styles from './Search.module.css';
import { useQueryParams } from '../../hooks/useQueryParams.ts';

interface Props {
  onSearch: (term: string) => void;
}

export const Search = ({ onSearch }: Props) => {
  const { searchTerm: initialSearchTerm } = useQueryParams();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
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
