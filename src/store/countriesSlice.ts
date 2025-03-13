import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Country {
  code: string;
  name: string;
}

export interface CountriesState {
  countries: Country[];
}

const initialState: CountriesState = {
  countries: [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
  },
});

export const getAllCountries = (state: { countries: CountriesState }) =>
  state.countries.countries;

export const { setCountries } = countriesSlice.actions;

export default countriesSlice.reducer;
