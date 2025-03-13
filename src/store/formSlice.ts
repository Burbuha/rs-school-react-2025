import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  terms?: boolean;
}

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  gender: '',
  terms: false,
  country: '',
  password: '',
  confirmPassword: '',
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FormState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const selectForm = (state: { form: FormState }) => state.form;
export const { setFormData } = formSlice.actions;

export default formSlice.reducer;
