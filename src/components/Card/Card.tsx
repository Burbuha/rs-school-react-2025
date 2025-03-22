import { memo } from 'react';
import { Country } from '../../App';
import styles from './Card.module.css';

type CountryCardProps = {
  country: Country;
  visited: boolean;
  toggleVisited: (countryName: string) => void;
};

const CountryCard = ({ country, visited, toggleVisited }: CountryCardProps) => {
  return (
    <div
      className={`${styles.card} ${visited ? styles.visited : ''}`}
      onClick={() => toggleVisited(country.name.common)}
    >
      <div className={styles.flag}>
        <img src={country.flags.png} alt={country.name.common} />
      </div>
      <h2>{country.name.common}</h2>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
    </div>
  );
};

export default memo(CountryCard);
