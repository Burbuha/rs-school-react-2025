import { ChangeEvent, useState } from 'react';

import { Country } from '../../store/countriesSlice';
import styles from './Autocomplete.module.css';

interface Props {
  options: Country[];
  id: string;
  name: 'country';
}

export const Autocomplete = ({ options, name, id }: Props) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Country[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setFiltered(
      value
        ? options.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setFiltered([]);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        id={id}
        name={name}
        value={query}
        onChange={handleChange}
        placeholder="Type to search..."
        className={styles.autocomplete}
        autoComplete="off"
      />
      {filtered.length > 0 && (
        <div className={styles.autocompleteDropdown}>
          {filtered.map((item, index) => (
            <div
              key={index}
              className={styles.autocompleteItem}
              onClick={() => handleSelect(item.name)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
