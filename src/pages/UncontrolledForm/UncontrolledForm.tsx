import React, { useRef, useState } from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { validationSchema } from '../../configs/validation-schema';
import { FormState, FormType } from '../../store/store';
import FormFields from '../../components/FormFields/FormFields';
import { setFormData } from '../../store/FormSlice';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: { message: string } }>(
    {}
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const formData = {
        userName: formRef.current?.userName?.value,
        age: formRef.current?.age?.value,
        gender: formRef.current?.gender.value,
        email: formRef.current?.email?.value,
        password: formRef.current?.password?.value,
        confirmPassword: formRef.current?.confirmPassword?.value,
        terms: formRef.current?.terms.checked,
        country: formRef.current?.country.value,
        image: imageBase64,
      } as FormState;

      await validationSchema.validate(formData, { abortEarly: false });

      dispatch(
        setFormData({
          ...formData,
          type: FormType.UncontrolledForm,
        })
      );
      navigate('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors = err.inner.reduce(
          (
            acc: { [key: string]: { message: string } },
            curr: Yup.ValidationError
          ) => {
            acc[curr.path as string] = curr;
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
        <FormFields errors={errors} handleImageChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UncontrolledForm;
