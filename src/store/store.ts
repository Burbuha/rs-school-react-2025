import { combineReducers, configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './uncontrolledFormSlice';
import hookFormReducer from './hookFormSlice';
import countriesReducer from './countriesSlice';

export interface FormState {
  userName: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  password: string;
  confirmPassword: string;
  image?: string;
  terms?: boolean;
  lastModified?: boolean;
}

const rootReducer = combineReducers({
  uncontrolledForm: uncontrolledFormReducer,
  hookForm: hookFormReducer,
  countries: countriesReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
