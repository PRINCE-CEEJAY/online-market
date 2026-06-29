import type { Product } from './../../types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
}
const initialProducts: ProductState = {
  products: [],
};
export const productSlice = createSlice({
  name: 'cart',
  initialState: initialProducts,
  reducers: {
    addProducts: (state, action: PayloadAction<Product>) => {
      const newProduct = {
        ...action.payload,
        id: state.products.length + 1,
      };
      const existingProduct = state.products.find(
        (product) => product.title === action.payload.title,
      );
      if (!existingProduct) {
        state.products.push(newProduct);
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload,
      );
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      state.products.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item,
      );
    },
  },
});

export const { addProducts, removeProduct, updateProduct } =
  productSlice.actions;

export default productSlice;
