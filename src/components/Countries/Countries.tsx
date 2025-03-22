import CountryCard from '../Card/Card';
import { Country } from '../../App';
import styles from './Countries.module.css';

interface Props {
  countries: Country[];
  visitedCountries: string[];
  toggleVisited: (countryName: string) => void;
}

export const Countries = ({
  countries,
  visitedCountries,
  toggleVisited,
}: Props) => {
  return (
    <div className={styles.countries}>
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          visited={visitedCountries.includes(country.name.common)}
          toggleVisited={toggleVisited}
        />
      ))}
    </div>
  );
};
