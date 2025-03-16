import { ChangeEvent, useState } from 'react';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { FormState } from '../../store/store';
import { getAllCountries } from '../../store/countriesSlice';
import { Autocomplete } from '../Autocomplete/Autocomplete';
import styles from './FormFields.module.css';

interface Props {
  register?: UseFormRegister<FormState>;
  errors: FieldErrors<FormState>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  control?: Control<FormState>;
}

const FormFields = ({
  register,
  errors,
  handleImageChange,
  control,
}: Props) => {
  const countries = useSelector(getAllCountries);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
      handleImageChange(e);
    }
  };

  return (
    <>
      <div>
        <label htmlFor="userName">Name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          {...(register ? register('userName') : [])}
        />
        <span className={styles.error}>
          {errors.userName && errors.userName.message}
        </span>
      </div>

      <div className="row">
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            {...(register ? register('age') : [])}
          />
          {errors.age && <span>{errors.age.message}</span>}
        </div>

        <div>
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            autoComplete="on"
            {...(register ? register('gender') : [])}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span>{errors.gender.message}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="country">Country</label>
        {control ? (
          <Autocomplete options={countries} name="country" control={control} />
        ) : (
          <Autocomplete options={countries} id="country" name="country" />
        )}

        {errors.country && <span>{errors.country.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          {...(register ? register('email') : [])}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          {...(register ? register('password') : [])}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          {...(register ? register('confirmPassword') : [])}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="terms">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            {...(register ? register('terms') : [])}
          />
          I accept the Terms and Conditions
        </label>
        {errors.terms && <span>{errors.terms.message}</span>}
      </div>

      <div className={styles.fileDownload}>
        <input
          className={styles.fileInput}
          type="file"
          id="image"
          name="image"
          accept="image/*"
          {...(register ? register('image') : [])}
          onChange={handleFileChange}
        />
        {fileName && (
          <span className={styles.file}>Uploaded file: {fileName}</span>
        )}
        <span className={styles.error}>
          {errors.image && errors.image.message}
        </span>
      </div>
    </>
  );
};

export default FormFields;
