import { CardList } from '../CardList/CardList.tsx';
import { Person } from '../../interfaces/person.interface.ts';
import styles from './Results.module.css';

interface Props {
  peoples: Person[];
  error: string | null;
  onPersonClick: (person: Person) => void;
}

export const Results = ({ peoples, error, onPersonClick }: Props) => {
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.resultsList}>
      <CardList items={peoples} onPersonClick={onPersonClick} />
    </div>
  );
};
