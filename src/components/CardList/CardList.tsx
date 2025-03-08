'use client';

import { Card } from '../Card/Card';
import { Person } from '../../interfaces/person.interface';
import styles from './CardList.module.css';

interface Props {
  items: Person[];
  onPersonClickAction: (person: Person) => void;
}

export const CardList = ({ items, onPersonClickAction }: Props) => {
  if (!items?.length) {
    return <div className={styles.noData}>No data...</div>;
  }

  return (
    <div>
      {items.map((item) => (
        <Card
          key={item.name}
          person={item}
          onPersonClickAction={onPersonClickAction}
        />
      ))}
    </div>
  );
};
