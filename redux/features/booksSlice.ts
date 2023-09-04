import { categories, sortValues } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface booksState {
  selectedOptions: Record<string, string>;
  isOpen: Record<string, boolean>;
}

const initialState: booksState = {
  selectedOptions: {
    categories: categories[0],
    sorting: sortValues[0],
  },
  isOpen: {},
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
  },
});

export const { setSelectedOption, toggleDropdown } = booksSlice.actions;

export default booksSlice.reducer;
