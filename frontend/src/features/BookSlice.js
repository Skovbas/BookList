import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./BookService";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  loading: false,
  success: false,
  error: null,
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  return await bookService.getBooks();
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  return await bookService.addBook(book);
});

export const updateBook = createAsyncThunk("books/updateBook", async (book) => {
  return await bookService.updateBook(book);
});

export const deleteBook = createAsyncThunk("books/deleteBook", async (id) => {
  return await bookService.deleteBook(id);
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Error fetching books!");
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        toast.success("Book added successfully!");
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
        toast.error("Book with this title by the same author already exists");
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((book) =>
          book.id === action.payload.id ? action.payload : book
        );
        toast.success("Book updated successfully!");
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Failed to update book!");
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((book) => book.id !== action.payload);
        toast.success("Book deleted successfully!");
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error("Failed to delete book!");
      });
  },
});

export const { resetError } = bookSlice.actions;
export default bookSlice.reducer;
