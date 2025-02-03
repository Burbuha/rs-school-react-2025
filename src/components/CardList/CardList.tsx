import { Component } from 'react';

import Card from '../Card/Card.tsx';
import { People } from '../../App.tsx';

interface Props {
  items: People[];
}

class CardList extends Component<Props> {
  render() {
    const { items } = this.props;
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
  }
}

export default CardList;
