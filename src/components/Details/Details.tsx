import { Person } from '../../interfaces/person.interface.ts';
import styles from './Details.module.css';

interface Props {
  person: Person;
  handleCloseDetails: VoidFunction;
}

export const Details = ({ person, handleCloseDetails }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{person.name}</h2>
        <button className={styles.closeButton} onClick={handleCloseDetails}>
          X
        </button>
      </div>
      <div className={styles.description}>
        <p>Birth year: {person.birth_year}</p>
        <p>Gender: {person.gender}</p>
        <p>Height: {person.height}cm</p>
        <p>Mass: {person.mass}kg</p>
        <p>Eye color: {person.eye_color}</p>
        <p>Hair color: {person.hair_color}</p>
        <p>Skin color: {person.skin_color}</p>
      </div>
    </div>
  );
};
