import { useRouter } from 'next/router';
import { useFetchDetails } from '../hooks/useFetchDetails';
import styles from '../styles/DetailsPage.module.css';
import { Loader } from '../components/Loader/Loader.tsx';

export const DetailsPage = () => {
  const router = useRouter();
  const { name, page, query } = router.query;
  const { details, loading, error } = useFetchDetails(name as string);

  const search = query || '';
  const currentPage = parseInt(typeof page === 'string' ? page : '1', 10);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!details) {
    router.push('/not-found');

    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{details.name}</h2>
        <button
          data-testid="close-button"
          className={styles.closeButton}
          onClick={() =>
            router.push(`/?query=${search}&page=${currentPage}`, undefined, {
              shallow: true,
            })
          }
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

export default DetailsPage;
