import { createSlice } from '@reduxjs/toolkit';

const initalFilters = {
  search: '',
  category: '',
  sortPrice: '',
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState: initalFilters,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortPrice: (state, action) => {
      state.sortPrice = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSortPrice } = filterSlice.actions;
export default filterSlice;
