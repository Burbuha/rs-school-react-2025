'use client';

import { CardList } from '../CardList/CardList.tsx';
import { Person } from '../../interfaces/person.interface.ts';
import styles from './Results.module.css';

interface Props {
  peoples: Person[];
  error: string | null;
  onPersonClickAction: (person: Person) => void;
}

export const Results = ({ peoples, error, onPersonClickAction }: Props) => {
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={styles.resultsList}>
      <CardList items={peoples} onPersonClickAction={onPersonClickAction} />
    </div>
  );
};
