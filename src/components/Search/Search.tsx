import { ChangeEvent, useState } from 'react';

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
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};
