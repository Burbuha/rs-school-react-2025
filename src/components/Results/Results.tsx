import { CardList } from '../CardList/CardList.tsx';
import { Loader } from '../Loader/Loader.tsx';
import { Person } from '../../interfaces/person.interface.ts';
import styles from './Results.module.css';
import { useQueryParams } from '../../hooks/useQueryParams.ts';
import { useFetchData } from '../../hooks/useFetchData.ts';

interface Props {
  onPersonClick: (person: Person) => void;
}

export const Results = ({ onPersonClick }: Props) => {
  const { searchTerm, currentPage } = useQueryParams();
  const { peoples, loading, error } = useFetchData(searchTerm, currentPage);

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

  return (
    <div className={styles.resultsList}>
      <CardList items={peoples} onPersonClick={onPersonClick} />
    </div>
  );
};
