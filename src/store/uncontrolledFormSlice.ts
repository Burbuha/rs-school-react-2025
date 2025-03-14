import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, RootState } from './store';

const initialState: FormState = {
  userName: '',
  age: 0,
  email: '',
  gender: '',
  terms: false,
  country: '',
  password: '',
  confirmPassword: '',
  lastModified: false,
  image: '',
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolled-form',
  initialState,
  reducers: {
    setUncontrolledFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
    resetLastModified: (state: FormState) => {
      state.lastModified = false;
    },
  },
});

export const selectUncontrolledForm = (state: RootState) =>
  state.uncontrolledForm;
export const { setUncontrolledFormData, resetLastModified } =
  uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
