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

const hookFormSlice = createSlice({
  name: 'hook-form',
  initialState,
  reducers: {
    setHookFormData: (state: FormState, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
    resetLastModified: (state: FormState) => {
      state.lastModified = false;
    },
  },
});

export const selectHookForm = (state: RootState) => state.hookForm;
export const { setHookFormData, resetLastModified } = hookFormSlice.actions;

export default hookFormSlice.reducer;
