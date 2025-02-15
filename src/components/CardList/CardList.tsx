import { Card } from '../Card/Card.tsx';
import { Person } from '../../interfaces/person.interface.ts';
import styles from './CardList.module.css';

interface Props {
  items: Person[];
  onPersonClick: (person: Person) => void;
}

export const CardList = ({ items, onPersonClick }: Props) => {
  if (!items.length) {
    return <div className={styles.noData}>No data...</div>;
  }

  return (
    <div>
      {items.map((item) => (
        <Card key={item.name} person={item} onPersonClick={onPersonClick} />
      ))}
    </div>
  );
};
