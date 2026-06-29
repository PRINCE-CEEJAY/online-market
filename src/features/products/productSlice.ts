import type { Product } from './../../types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
}
const initialProducts: ProductState = {
  products: [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description:
        'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
  ],
};
export const productSlice = createSlice({
  name: 'products',
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

    createProductArray: (state, action) => {
      state.products = action.payload;
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

export const { createProductArray, addProducts, removeProduct, updateProduct } =
  productSlice.actions;

export default productSlice;
