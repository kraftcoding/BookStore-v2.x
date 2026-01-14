import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, ICartBooks } from '../../types/cart';
import { Book } from '../../types/book';

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          itemQuantity: state.cartItems[existingIndex].itemQuantity + 1,
        };
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      } else {
        let tempBookItem = {
          ...action.payload,
          itemQuantity: 1,
        };
        state.cartItems.push(tempBookItem);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem('cartItems', '[]');
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    decrementQuantity(state, action: PayloadAction<Book>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].itemQuantity > 1) {
        state.cartItems[itemIndex].itemQuantity -= 1;
      } else if (state.cartItems[itemIndex].itemQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
      }
    },
    loadCart: (state, action: PayloadAction<ICartBooks[]>) => {
      state.cartItems = action.payload;
    },
  },
});
const cartReducer = cartSlice.reducer;
export const { addToCart, removeItem, decrementQuantity, clearCart, loadCart } =
  cartSlice.actions;
export default cartReducer;
