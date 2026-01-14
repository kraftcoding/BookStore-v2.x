import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types/book';
import axiosInstance from '../../common/axiosInstance';

export const fetchAllBooks = createAsyncThunk(
  'fetchAllBooks',
  async () => {
    try {
      const res = await axiosInstance.get('/Books');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: Book[] = [];

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    highestPriceFirst: (state) => {
      state.sort((a, b) => (a.price > b.price ? -1 : 1));
    },
    lowestPriceFirst: (state) => {
      state.sort((a, b) => (a.price < b.price ? -1 : 1));
    },
    alphabetical: (state) => {
      state.sort((a, b) => b.name.localeCompare(a.name));
    },
    alphabetical2: (state) => {
      state.sort((a, b) => a.name.localeCompare(b.name));
    },
    searchByName: (state, action) => {
      const filteredBooks = state.filter((book) =>
        book.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredBooks:
          action.payload.length > 0 ? filteredBooks : [...state],
      };
    },
  },

  extraReducers: (build) => {
    build.addCase(fetchAllBooks.fulfilled, (state, action) => {
      console.log('data is fetched');
      if (action.payload && 'message' in action.payload) {
        return state;
      } else if (!action.payload) {
        return state;
      }
      return action.payload;
    });
    build.addCase(fetchAllBooks.rejected, (state, action) => {
      console.log('error');
      return state;
    });
    build.addCase(fetchAllBooks.pending, (state, action) => {
      console.log('loading');
      return state;
    });
  },
});

const bookReducer = bookSlice.reducer;
export const {
  lowestPriceFirst,
  highestPriceFirst,
  alphabetical,
  alphabetical2,
} = bookSlice.actions;
export default bookReducer;
