import { configureStore } from '@reduxjs/toolkit';
import formReducer, { FormState } from './formSlice';
import countriesReducer, { CountriesState } from './countriesSlice';

export interface RootState {
  form: FormState;
  countries: CountriesState;
}

const store = configureStore({
  reducer: {
    form: formReducer,
    countries: countriesReducer,
  },
});

export default store;
