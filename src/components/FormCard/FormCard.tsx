import { FormState, FormType } from '../../store/store';
import styles from './FormCard.module.css';

interface Props {
  form: FormState;
}

export const FormCard = ({ form }: Props) => {
  return (
    <div className={styles.card}>
      {form.image && (
        <div>
          <img
            src={form.image}
            alt="Uploaded"
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        </div>
      )}
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
      <div className={styles.info}>
        Created with{' '}
        {form.type === FormType.HookForm ? 'hook form' : 'uncontrolled form'}
      </div>
    </div>
  );
};
