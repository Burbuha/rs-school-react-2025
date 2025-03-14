import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../configs/countries';

export interface Country {
  code: string;
  name: string;
}

export interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = { countries };

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const getAllCountries = (state: { countries: CountriesState }) =>
  state.countries.countries;

export default countriesSlice.reducer;
