import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../types/book';
import axiosInstance from '../../common/axiosInstance';
import { AxiosError } from 'axios';

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

export const fetchBook = createAsyncThunk(
  'fetchBook',
  async (id:string | undefined) => {
    try {
      const res = await axiosInstance.get('/books/' + id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateBook = createAsyncThunk(
  'updateProfile',
  async (book: IBookInputs) => {
    try {
      const UserResponse = await axiosInstance.put('/books/' + book.isbn, {
        ...book,
      });

      const data = UserResponse.data;
      return data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export interface IBookInputs {
  title: string;
  isbn: string;
  description: string;
  author: string;
  category: string;
  image: string;
}

export interface BookState {  
  bookInfo: Book | null; 
  Books: Book[];
}

const initialState: BookState = {
  bookInfo: null,
  Books: [] = [],
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    fetchBookSuccess: (state, action: PayloadAction<Book>) => {
      state.bookInfo = action.payload;
    },
    fetchAllBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      state.Books = action.payload;
    },
    highestISBNFirst: (state) => {
      state.Books.sort((a, b) => (a.isbn > b.isbn ? -1 : 1));
    },
    lowestISBNFirst: (state) => {
      state.Books.sort((a, b) => (a.isbn < b.isbn ? -1 : 1));
    },
    alphabetical: (state) => {
      state.Books.sort((a, b) => b.title.localeCompare(a.title));
    },
    alphabetical2: (state) => {
      state.Books.sort((a, b) => a.title.localeCompare(b.title));
    },
    searchByName: (state, action) => {
      const filteredBooks = state.Books.filter((book) =>
        book.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredBooks:
          action.payload.length > 0 ? filteredBooks : [...state.Books],
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
  fetchBookSuccess,
  fetchAllBooksSuccess,
  lowestISBNFirst,
  highestISBNFirst,
  alphabetical,
  alphabetical2,
} = bookSlice.actions;

export default bookReducer;
