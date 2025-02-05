import { CardList } from '../CardList/CardList.tsx';
import { People } from '../../App.tsx';
import { Loader } from '../Loader/Loader.tsx';

interface Props {
  peoples: People[];
  loading: boolean;
  error: string | null;
}

export const Results = ({ peoples, loading, error }: Props) => {
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

  if (!peoples.length) {
    return <div className="no-data">No data...</div>;
  }

  return (
    <div className="results-list">
      <CardList items={peoples} />
    </div>
  );
};
