import { FormState } from '../../store/store';
import styles from './FormCard.module.css';

interface Props {
  form: FormState;
}

export const FormCard = ({ form }: Props) => {
  return (
    <div className={styles.data}>
      <p>
        <strong>Name:</strong> {form.userName}
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
      {form.image && (
        <div>
          <strong>Image:</strong>
          <img
            src={form.image}
            alt="Uploaded"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </div>
      )}
    </div>
  );
};
