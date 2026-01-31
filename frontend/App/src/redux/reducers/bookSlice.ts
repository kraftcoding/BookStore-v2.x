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
  async (book: any) => {
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

export const addBook = createAsyncThunk(
  'addBook',
  async (book: any) => {
    try {
      const UserResponse = await axiosInstance.post('/books', {
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

export const postDeleteBook = createAsyncThunk(
  'deleteBook',
  async (postdata: any) => {
    try {
      const UserResponse = await axiosInstance.post('/books/delete', {
        ...postdata,
      });

      const data = UserResponse.data;
      return data.status;
    } catch (e) {
      const error = e as AxiosError;
      return error.status;
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
  email?: string;
}

export interface BookState {  
  book: Book | null; 
  books: Book[];
}

const initialState: BookState = {
  book: null,
  books: [] = [],
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    fetchBookSuccess: (state, action: PayloadAction<Book>) => {
      state.book = action.payload;
    },
    fetchAllBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      state.books = action.payload;
    },
    highestISBNFirst: (state) => {
      state.books.sort((a, b) => (a.isbn > b.isbn ? -1 : 1));
    },
    lowestISBNFirst: (state) => {
      state.books.sort((a, b) => (a.isbn < b.isbn ? -1 : 1));
    },
    alphabetical: (state) => {
      state.books.sort((a, b) => b.title.localeCompare(a.title));
    },
    alphabetical2: (state) => {
      state.books.sort((a, b) => a.title.localeCompare(b.title));
    },
    searchByName: (state, action) => {
      const filteredBooks = state.books.filter((book) =>
        book.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        filteredBooks:
          action.payload.length > 0 ? filteredBooks : [...state.books],
      };
    },
  },

  extraReducers: (build) => {

    // fetchAllBooks reducers
    build.addCase(fetchAllBooks.fulfilled, (state, action) => {     
      state.books = action.payload;
    });
    build.addCase(fetchAllBooks.rejected, (state, action) => {
      console.log('error in fetchAllBooks');
    });
    build.addCase(fetchAllBooks.pending, (state, action) => {
      console.log('pending in fetchAllBooks');
    });

    // fetchBook reducers
    build.addCase(fetchBook.fulfilled, (state, action) => {     
      state.book = action.payload;
    });
    build.addCase(fetchBook.rejected, (state, action) => {
      console.log('error in fetchBook');
    });
    build.addCase(fetchBook.pending, (state, action) => {
      console.log('pending in fetchBook');
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
