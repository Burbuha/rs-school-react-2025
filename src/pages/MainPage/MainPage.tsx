import { selectUncontrolledForm } from '../../store/uncontrolledFormSlice';
import { FormCard } from '../../components/FormCard/FormCard';
import { selectHookForm } from '../../store/hookFormSlice';
import styles from './MainPage.module.css';
import { useAppSelector } from '../../hooks/hooks/hooks.ts';

const MainPage = () => {
  const uncontrolledForm = useAppSelector(selectUncontrolledForm);
  const hookForm = useAppSelector(selectHookForm);

  return (
    <div className={styles.mainPage}>
      <div
        className={`${styles.formContainer} ${uncontrolledForm.lastModified ? styles.active : ''}`}
      >
        <h2>Uncontrolled Form Data</h2>
        <FormCard form={uncontrolledForm} />
      </div>
      <div
        className={`${styles.formContainer} ${hookForm.lastModified ? styles.active : ''}`}
      >
        <h2>Hook Form Data</h2>
        <FormCard form={hookForm} />
      </div>
    </div>
  );
};

export default MainPage;
