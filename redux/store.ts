import booksSlice from './features/booksSlice';
import { googleBooksApi } from './services/googleBooksApi';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: { booksSlice, [googleBooksApi.reducerPath]: googleBooksApi.reducer },
  devTools: process.env.NODE_ENV !== 'production',

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([googleBooksApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
