import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/book';

export interface FavoriteState {
  favoriteItems: Book[];
}

const initialState: FavoriteState = {
  favoriteItems: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Book>) {
      const existingIndex = state.favoriteItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex === -1) {
        state.favoriteItems.push(action.payload);
      }
    },
    removeFromFavorites(state, action: PayloadAction<number>) {
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload
      );
    },
    loadFavorite: (state, action: PayloadAction<Book[]>) => {
      state.favoriteItems = action.payload;
    },
    clearFavorites: (state) => {
      state.favoriteItems = [];
      localStorage.setItem('favoriteItems', '[]');
    },
  },
});
const favoriteReducer = favoriteSlice.reducer;
export const {
  addToFavorites,
  removeFromFavorites,
  loadFavorite,
  clearFavorites,
} = favoriteSlice.actions;
export default favoriteReducer;
