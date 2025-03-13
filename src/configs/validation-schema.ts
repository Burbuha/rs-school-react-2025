import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Z]/, 'Name should start with an uppercase letter')
    .required('Name is required'),
  age: Yup.number().positive().integer().required('Age is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8)
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[\W_]/, 'Password must contain a special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Confirm Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must accept Terms and Conditions'),
  country: Yup.string().required('Country is required'),
  gender: Yup.string().required('Gender is required'),
});
