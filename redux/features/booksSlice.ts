import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories, SortingBy } from '@/constants';
import { IBook } from '@/interfaces';

export interface booksState {
  selectedOptions: Record<string, string>;
  isOpen: Record<string, boolean>;
  searchTerm: string;
  startIndex: number;
  volumeId: string;
  books: IBook[];
}

const initialState: booksState = {
  selectedOptions: {
    categories: Categories.ALL,
    sorting: SortingBy.RELEVANCE,
  },
  isOpen: {},
  searchTerm: '',
  startIndex: 30,
  volumeId: '',
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelectedOption: (
      state,
      action: PayloadAction<{ dropdownId: string; option: string }>,
    ) => {
      const { dropdownId, option } = action.payload;
      state.selectedOptions[dropdownId] = option;
      state.books = [];
    },

    toggleDropdown: (state, action: PayloadAction<string>) => {
      const dropdownId = action.payload;
      state.isOpen[dropdownId] = !state.isOpen[dropdownId];
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.books = [];
    },

    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },

    setVolumeId: (state, action: PayloadAction<string>) => {
      state.volumeId = action.payload;
    },

    setBooks: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
    },
  },
});

export const {
  setSelectedOption,
  toggleDropdown,
  setSearchTerm,
  setStartIndex,
  setVolumeId,
  setBooks,
} = booksSlice.actions;

export default booksSlice.reducer;
