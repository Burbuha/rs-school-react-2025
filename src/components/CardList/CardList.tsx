import { Card } from '../Card/Card.tsx';
import { People } from '../../App.tsx';

interface Props {
  items: People[];
}

export const CardList = ({ items }: Props) => {
  return (
    <div className="card-list">
      {items.map((item) => (
        <Card
          key={item.name}
          name={item.name}
          description={`Birth year: ${item.birth_year} Gender: ${item.gender}, Height: ${item.height}cm`}
        />
      ))}
    </div>
  );
};
