import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./features/booksSlice";

export const store = configureStore({
  reducer: { booksSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
