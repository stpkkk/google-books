import { Categories, SortingBy } from '@/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface booksState {
  selectedOptions: Record<string, string>;
  isOpen: Record<string, boolean>;
  searchTerm: string;
  booksToRender: number;
  volumeId: string;
}

const initialState: booksState = {
  selectedOptions: {
    categories: Categories.ALL,
    sorting: SortingBy.RELEVANCE,
  },
  isOpen: {},
  searchTerm: '',
  booksToRender: 30,
  volumeId: '',
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

    setBooksToRender: (state, action: PayloadAction<number>) => {
      state.booksToRender = action.payload;
    },

    setVolumeId: (state, action: PayloadAction<string>) => {
      state.volumeId = action.payload;
    },
  },
});

export const {
  setSelectedOption,
  toggleDropdown,
  setSearchTerm,
  setBooksToRender,
  setVolumeId,
} = booksSlice.actions;

export default booksSlice.reducer;
