import { createSlice } from '@reduxjs/toolkit';

const initalFilters = {
  search: '',
  category: '',
  sort: '',
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
      state.sort = action.payload;
    },
  },
});

export const { setSearch, setCategory, setSortPrice } = filterSlice.actions;
export default filterSlice;
