import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/BookSlice";
import authorReducer from "../features/authorSlice";

const store = configureStore({
  reducer: {
    books: bookReducer,
    authors: authorReducer,
  },
});

export default store;
