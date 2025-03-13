import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { FormState, setFormData } from '../../store/formSlice';
import { validationSchema } from '../../configs/validation-schema';
import { getAllCountries } from '../../store/countriesSlice';
import styles from './HookForm.module.css';

const HookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector(getAllCountries);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: FormState) => {
    dispatch(setFormData(data));
    navigate('/');
  };

  return (
    <>
      <h2 className={styles.formHeader}>Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register('name')} />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="row">
          <div>
            <label htmlFor="age">Age</label>
            <input type="number" {...register('age')} />
            {errors.age && <span>{errors.age.message}</span>}
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select {...register('gender')}>
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
          <select {...register('country')}>
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <span>{errors.country.message}</span>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email')} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="password">Password</label>
          <input type="password" {...register('password')} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div className={styles.passwordField}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" {...register('confirmPassword')} />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <div>
          <label htmlFor="terms">
            <input type="checkbox" {...register('terms')} />I accept the Terms
            and Conditions
          </label>
          {errors.terms && <span>{errors.terms.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default HookForm;
