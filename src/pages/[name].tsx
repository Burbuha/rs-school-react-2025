import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { getServerSideProps as getDetailsServerSideProps } from '../utils/getDetailsServerSideProps';
import styles from '../styles/DetailsPage.module.css';

interface Props {
  details: {
    name: string;
    birth_year: string;
    gender: string;
    height: string;
    mass: string;
    eye_color: string;
    hair_color: string;
    skin_color: string;
  } | null;
  error: string | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getDetailsServerSideProps(context);
};

const DetailsPage = ({ details, error }: Props) => {
  const router = useRouter();
  const { page, query } = router.query;

  const search = query || '';
  const currentPage = parseInt(typeof page === 'string' ? page : '1', 10);

  if (!details) {
    return <div>Error: {error}</div>;
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
