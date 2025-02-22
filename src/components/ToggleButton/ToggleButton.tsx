import styles from './ToggleButton.module.css';
import { useTheme } from '../../context/ThemeContext.tsx';

interface Props {
  onClick: VoidFunction;
}

export const ToggleButton = ({ onClick }: Props) => {
  const { theme } = useTheme();

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        onClick={onClick}
        data-testid="theme-button"
        defaultChecked={theme === 'light'}
      />
    </div>
  );
};
