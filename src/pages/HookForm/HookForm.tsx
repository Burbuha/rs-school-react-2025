import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { validationSchema } from '../../configs/validation-schema';
import { FormState } from '../../store/store';
import { setHookFormData } from '../../store/hookFormSlice';
import FormFields from '../../components/FormFields/FormFields';
import { useAppDispatch } from '../../hooks/hooks/hooks';
import { resetLastModified } from '../../store/uncontrolledFormSlice.ts';

const HookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imageBase64, setImageBase64] = useState<string | undefined>(undefined);

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormState) => {
    dispatch(
      setHookFormData({ ...data, image: imageBase64, lastModified: true })
    );
    dispatch(resetLastModified());
    navigate('/');
  };

  console.log(isValid, errors);

  return (
    <>
      <h2>Hook Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields
          register={register}
          errors={errors}
          handleImageChange={handleImageChange}
        />
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default HookForm;
