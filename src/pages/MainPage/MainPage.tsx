import { FormCard } from '../../components/FormCard/FormCard';
import { getAllForms } from '../../store/FormSlice';
import { useAppSelector } from '../../hooks/hooks';
import styles from './MainPage.module.css';

const MainPage = () => {
  const forms = useAppSelector(getAllForms);

  if (!forms.length) {
    return (
      <div className={styles.noDataContainer}>
        <p className={styles.noDataMessage}>No data...</p>
      </div>
    );
  }

  return (
    <div className={styles.mainPage}>
      {forms.map((form, index, arr) => (
        <div
          className={`${styles.formContainer} ${index === arr.length - 1 ? styles.active : ''}`}
        >
          <FormCard form={form} />
        </div>
      ))}
    </div>
  );
};

export default MainPage;
