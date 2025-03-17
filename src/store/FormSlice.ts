import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, RootState } from './store';

const initialState: FormState[] = [];

const formSlice = createSlice({
  name: 'hook-form',
  initialState,
  reducers: {
    setFormData: (state: FormState[], action: PayloadAction<FormState>) => {
      return [...state, action.payload];
    },
  },
});

export const getAllForms = (state: RootState) => state.forms;
export const { setFormData } = formSlice.actions;

export default formSlice.reducer;
