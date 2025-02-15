import styles from './ToggleButton.module.css';

interface Props {
  onClick: VoidFunction;
}

export const ToggleButton = ({ onClick }: Props) => {
  return (
    <div className={styles.container}>
      <input type="checkbox" onClick={onClick} data-testid="theme-button" />
    </div>
  );
};
