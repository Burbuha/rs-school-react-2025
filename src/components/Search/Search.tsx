import { ChangeEvent, useState } from 'react';

import styles from './Search.module.css';

interface Props {
  onSearch: (term: string) => void;
  initialSearchTerm: string;
}

export const Search = ({ onSearch, initialSearchTerm }: Props) => {
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
