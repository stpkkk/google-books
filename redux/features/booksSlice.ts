import { categories, sortValues } from "@/constants";
import { IBook } from "@/interfaces";
import { createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

export interface booksState {
  selectedOptions: Record<string, string>;
  isOpen: Record<string, boolean>;
  searchTerm: string;
  booksToRender: number;
  data: IBook[];
  loading: boolean;
  error: FetchBaseQueryError | SerializedError | null;
}

const initialState: booksState = {
  selectedOptions: {
    categories: categories[0],
    sorting: sortValues[0],
  },
  isOpen: {},
  searchTerm: "",
  booksToRender: 30,
  data: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setSelectedOption: (
      state,
      action: PayloadAction<{ dropdownId: string; option: string }>
    ) => {
      const { dropdownId, option } = action.payload;
      state.selectedOptions[dropdownId] = option;
    },

    toggleDropdown: (state, action: PayloadAction<string>) => {
      const dropdownId = action.payload;
      state.isOpen[dropdownId] = !state.isOpen[dropdownId];
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setBooksToRender: (state, action: PayloadAction<number>) => {
      state.booksToRender = action.payload;
    },

    fetchBooksStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<IBook[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchBooksFailure: (
      state,
      action: PayloadAction<FetchBaseQueryError | SerializedError>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedOption,
  toggleDropdown,
  setSearchTerm,
  setBooksToRender,
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,
} = booksSlice.actions;

export default booksSlice.reducer;
