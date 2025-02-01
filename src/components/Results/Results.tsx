import { Component } from 'react';
import CardList from '../CardList/CardList.tsx';
import { People } from '../../App.tsx';
import Loader from '../Loader/Loader.tsx';

interface Props {
  peoples: People[];
  loading: boolean;
  error: string | null;
}

class Results extends Component<Props> {
  render() {
    const { peoples, loading, error } = this.props;

    if (loading) {
      return <Loader />;
    }

    if (error) {
      return (
        <div className="error">
          <p>Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="results-list">
        <CardList items={peoples} />
      </div>
    );
  }
}

export default Results;
