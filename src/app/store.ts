import { configureStore } from '@reduxjs/toolkit';
import apiSlice from '../services/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartSlice } from '../features/cart/cartSlice';
import filterSlice from '../features/filters/filterSlice';
import productSlice from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    products: productSlice.reducer,
    filters: filterSlice.reducer,

    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
setupListeners(store.dispatch);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
