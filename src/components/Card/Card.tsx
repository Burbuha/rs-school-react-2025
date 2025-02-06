import styles from './Card.module.css';

interface Props {
  name: string;
  onClick: VoidFunction;
}

export const Card = ({ name, onClick }: Props) => {
  return (
    <div onClick={onClick} className={styles.person}>
      <h3>{name}</h3>
    </div>
  );
};
