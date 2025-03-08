'use client';

import { useRouter } from 'next/navigation';
import styles from './DetailsPageClient.module.css';

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
  };
  search: string;
  currentPage: number;
}

const DetailsPageClient = ({ details, search, currentPage }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{details.name}</h2>
        <button
          data-testid="close-button"
          className={styles.closeButton}
          onClick={() => router.push(`/?query=${search}&page=${currentPage}`)}
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

export default DetailsPageClient;
