import styles from './ToggleButton.module.css';
import { useTheme } from '../../context/ThemeContext.tsx';

export const ToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.container}>
      <input
        className={styles.toggleButton}
        type="checkbox"
        onClick={toggleTheme}
        data-testid="theme-button"
        defaultChecked={theme === 'light'}
      />
    </div>
  );
};
