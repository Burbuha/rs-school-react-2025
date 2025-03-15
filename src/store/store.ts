import { combineReducers, configureStore } from '@reduxjs/toolkit';
import formReducer from './FormSlice';
import countriesReducer from './countriesSlice';

export enum FormType {
  HookForm = 'hookForm',
  UncontrolledForm = 'uncontrolledForm',
}

export interface FormState {
  userName: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  image: string;
  terms?: boolean;
  type?: FormType;
}

const rootReducer = combineReducers({
  forms: formReducer,
  countries: countriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
