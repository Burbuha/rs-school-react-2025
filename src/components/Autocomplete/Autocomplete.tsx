import { ChangeEvent, useState } from 'react';
import { Control } from 'react-hook-form';
import { Country } from '../../store/countriesSlice';
import styles from './Autocomplete.module.css';
import { FormState } from '../../store/store';

interface Props {
  options: Country[];
  name: string;
  id?: string;
  control?: Control<FormState>;
  onChange?: (value: string) => void;
}

export const Autocomplete = ({ options, id, name, onChange }: Props) => {
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
    onChange?.(value);
  };

  const handleSelect = (option: string) => {
    setQuery(option);
    setFiltered([]);
    onChange?.(option);
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
