import type { Product } from './../../types/types';
import { createSlice } from '@reduxjs/toolkit';

type CartProduct = Product & { quantity: number };

interface CartType {
  cart: CartProduct[];
}

const initialCart: CartType = {
  cart: [
    // {
    //   id: 1,
    //   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    //   price: 109.95,
    //   description:
    //     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    //   category: "men's clothing",
    //   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
    //   rating: {
    //     rate: 3.9,
    //     count: 120,
    //   },
    //   quantity: 1,
    // },
  ],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
        return;
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
        };
        state.cart.push(newItem);
      }
    },

    incrementQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem && existingItem.quantity < 100) {
        //max of 100 allowed
        existingItem.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice;
