import { configureStore } from '@reduxjs/toolkit';

import selectedItemsReducer from './slices/selectedItemsSlice';
import { peopleApi } from '../services/peopleApi.ts';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
    [peopleApi.reducerPath]: peopleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
