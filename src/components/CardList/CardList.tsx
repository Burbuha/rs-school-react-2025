import { Card } from '../Card/Card.tsx';
import { Person } from '../../interfaces/person.interface.ts';

interface Props {
  items: Person[];
  onPersonClick: (person: Person) => void;
}

export const CardList = ({ items, onPersonClick }: Props) => {
  return (
    <div>
      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          onClick={() => onPersonClick(item)}
        />
      ))}
    </div>
  );
};
