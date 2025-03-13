import { useSelector } from 'react-redux';

import { selectForm } from '../../store/formSlice';
import styles from './MainPage.module.css';

const MainPage = () => {
  const form = useSelector(selectForm);

  return (
    <>
      <h2>Form Data</h2>
      <div className={styles['form-data']}>
        <p>
          <strong>Name:</strong> {form.name}
        </p>
        <p>
          <strong>Age:</strong> {form.age}
        </p>
        <p>
          <strong>Email:</strong> {form.email}
        </p>
        <p>
          <strong>Gender:</strong> {form.gender}
        </p>
        <p>
          <strong>Country:</strong> {form.country}
        </p>
        <p>
          <strong>Terms Accepted:</strong> {form.terms ? 'Yes' : 'No'}
        </p>
      </div>
    </>
  );
};

export default MainPage;
