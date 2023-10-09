import { Categories, SortingBy } from '@/enums';
import { Book } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface booksState {
  selectedOptions: Record<string, string>;
  isOpen: Record<string, boolean>;
  searchTerm: string;
  startIndex: number;
  volumeId: string;
  books: Book[];
}

const initialState: booksState = {
  selectedOptions: {
    categories: Categories.ALL,
    sorting: SortingBy.RELEVANCE,
  },
  isOpen: {},
  searchTerm: 'книга',
  startIndex: 0,
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
    },

    toggleDropdown: (state, action: PayloadAction<string>) => {
      const dropdownId = action.payload;
      state.isOpen[dropdownId] = !state.isOpen[dropdownId];
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },

    setVolumeId: (state, action: PayloadAction<string>) => {
      state.volumeId = action.payload;
    },

    setBooks: (state, action: PayloadAction<Book[]>) => {
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
