import axios from "axios";

const API_URL = "http://127.0.0.1:8000/books/";

const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch books");
  }
};

const addBook = async (book) => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add book");
  }
};

const updateBook = async (book) => {
  try {
    const response = await axios.put(`${API_URL}${book.id}/`, book);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update book");
  }
};

const deleteBook = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
    return id;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete book");
  }
};

const bookService = {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
};

export default bookService;
