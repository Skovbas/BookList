import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorService from "./authorService";

const initialState = {
  items: [],
  loading: false,
  success: false,
  error: null,
};

export const fetchAuthors = createAsyncThunk(
  "authors/fetchAuthors",
  async () => {
    return await authorService.getAuthors();
  }
);

const authorSlice = createSlice({
  name: "authors",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authorSlice.reducer;
