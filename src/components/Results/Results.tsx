import { CardList } from '../CardList/CardList.tsx';
import { Loader } from '../Loader/Loader.tsx';
import { Person } from '../../interfaces/person.interface.ts';
import styles from './Results.module.css';

interface Props {
  peoples: Person[];
  loading: boolean;
  error: string | null;
  onPersonClick: (person: Person) => void;
}

export const Results = ({ peoples, loading, error, onPersonClick }: Props) => {
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!peoples.length) {
    return <div className={styles.noData}>No data...</div>;
  }

  return (
    <div className={styles.resultsList}>
      <CardList items={peoples} onPersonClick={onPersonClick} />
    </div>
  );
};
