import { ChangeEvent, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Country } from '../../store/countriesSlice';
import { FormState } from '../../store/store';
import styles from './Autocomplete.module.css';

interface Props {
  options: Country[];
  control: Control<FormState>;
  name: 'country';
}

export const ControlAutocomplete = ({ control, name, options }: Props) => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Country[]>([]);

  const {
    field: { onChange },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

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
    onChange(value);
  };

  const handleSelect = (option: string) => {
    setQuery(option);
    onChange(option);
    setFiltered([]);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
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
