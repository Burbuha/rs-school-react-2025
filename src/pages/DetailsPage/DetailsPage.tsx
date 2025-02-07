import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../../components/Loader/Loader.tsx';
import styles from './DetailsPage.module.css';
import { useFetchDetails } from '../../hooks/useFetchDetails.ts';

export const DetailsPage = () => {
  const { name } = useParams<{ name: string }>();
  const { details, loading, error } = useFetchDetails(name || '');
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const search = params.get('query') || '';
  const page = parseInt(params.get('page') || '1', 10);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    return <div>No details available</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{details.name}</h2>
        <button
          className={styles.closeButton}
          onClick={() => navigate(`/?query=${search}&page=${page}`)}
        >
          X
        </button>
      </div>
      <div className={styles.description}>
        <p>Birth year: {details.birth_year}</p>
        <p>Gender: {details.gender}</p>
        <p>Height: {details.height}cm</p>
        <p>Mass: {details.mass}kg</p>
        <p>Eye color: {details.eye_color}</p>
        <p>Hair color: {details.hair_color}</p>
        <p>Skin color: {details.skin_color}</p>
      </div>
    </div>
  );
};
