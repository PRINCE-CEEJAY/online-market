import { combineReducers, configureStore } from '@reduxjs/toolkit';
import apiSlice from '@/services/api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { cartSlice } from '../features/cart/cartSlice';
import filterSlice from '../features/filters/filterSlice';
import productSlice from '../features/products/productSlice';
import { loadState, saveState } from '../lib/localstorage';
import firebaseApi from '@/services/firebaseApi';

const loadedState = loadState();
const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  products: productSlice.reducer,
  filters: filterSlice.reducer,

  [apiSlice.reducerPath]: apiSlice.reducer,
  [firebaseApi.reducerPath]: firebaseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, firebaseApi.middleware),
});
setupListeners(store.dispatch);

store.subscribe(() => {
  saveState(store.getState());
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
