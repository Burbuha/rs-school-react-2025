import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, setFormData } from '../../store/formSlice';
import { validationSchema } from '../../configs/validation-schema';
import { getAllCountries } from '../../store/countriesSlice';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const countries = useSelector(getAllCountries);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const formData = {
        name: formRef.current?.userName?.value,
        age: formRef.current?.age?.value,
        gender: formRef.current?.gender.value,
        email: formRef.current?.email?.value,
        password: formRef.current?.password?.value,
        confirmPassword: formRef.current?.confirmPassword?.value,
        terms: formRef.current?.terms.checked,
        country: formRef.current?.country.value,
      } as FormState;

      console.log('UncontrolledForm', formData);

      await validationSchema.validate(formData, { abortEarly: false });

      dispatch(setFormData(formData));
      navigate('/');
    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const validationErrors = err.inner.reduce(
          (acc: { [key: string]: string }, curr: Yup.ValidationError) => {
            acc[curr.path as string] = curr.message;
            return acc;
          },
          {}
        );
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <h2>Uncontrolled Form</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Name</label>
          <input type="text" id="userName" name="userName" />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className="row">
          <div>
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" />
            {errors.age && <span>{errors.age}</span>}
          </div>

          <div>
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <span>{errors.gender}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <select id="country" name="country">
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country.code} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country && <span>{errors.country}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          {errors.password && <span>{errors.password}</span>}
        </div>

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
          {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
        </div>

        <div>
          <label htmlFor="terms">
            <input type="checkbox" id="terms" name="terms" />I accept the Terms
            and Conditions
          </label>
          {errors.terms && <span>{errors.terms}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
