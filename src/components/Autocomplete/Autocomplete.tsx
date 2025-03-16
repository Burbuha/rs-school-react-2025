import { ChangeEvent, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Country } from '../../store/countriesSlice';
import styles from './Autocomplete.module.css';

interface Props {
  options: Country[];
  id?: string;
  name: string;
  control?: Control<any>;
}

export const Autocomplete = ({ options, id, name, control }: Props) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Country[]>([]);
  const { field } = control
    ? useController({ name, control })
    : { field: { onChange: () => {} } };

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

    if (control) {
      field.onChange(value);
    }
  };

  const handleSelect = (option: string) => {
    setQuery(option);
    setFiltered([]);

    if (control) {
      field.onChange(option);
    }
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
