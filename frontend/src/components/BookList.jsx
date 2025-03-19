import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../features/BookSlice";
import { fetchAuthors } from "../features/authorSlice";
import { toast } from "react-toastify";
import { resetError } from "../features/BookSlice";

const BookList = () => {
  const dispatch = useDispatch();
  const { items: books, error } = useSelector((state) => state.books);
  const { items: authors } = useSelector((state) => state.authors);

  // state pagination
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  // sorting (можна також інплементувати mergesort)
  const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));

  //
  const [formData, setFormData] = useState({
    isModalOpen: false,
    bookTitle: "",
    selectedAuthor: "",
    bookId: null,
    isEditing: false,
  });

  useEffect(() => {
    // Error handle, when user add already exist book
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }

    dispatch(fetchBooks());
    dispatch(fetchAuthors());
  }, [error, dispatch]);

  // Open modal for adding
  const handleAddBook = () => {
    setFormData({
      isModalOpen: true,
      bookTitle: "",
      selectedAuthor: "",
      bookId: null,
      isEditing: false,
    });
  };

  // Open modal for editing
  const handleEditBook = (book) => {
    setFormData({
      isModalOpen: true,
      bookTitle: book.title,
      selectedAuthor: book.author,
      bookId: book.id,
      isEditing: true,
    });
  };

  // Close modal and reset form
  const handleCloseModal = () => {
    setFormData({
      isModalOpen: false,
      bookTitle: "",
      selectedAuthor: "",
      bookId: null,
      isEditing: false,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const bookData = {
      title: formData.bookTitle,
      author: formData.selectedAuthor,
    };

    if (formData.isEditing) {
      dispatch(updateBook({ id: formData.bookId, ...bookData }));
    } else {
      dispatch(addBook(bookData));
    }

    handleCloseModal();
  };

  // Handle book deletion
  const handleDeleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id));
    }
  };

  // pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container mx-auto px-32">
        <div className="flex justify-start mb-4">
          <h2 className="text-3xl font-bold">List of Books</h2>
        </div>

        <div className="relative">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {currentBooks.map((book, index) => (
              <div
                key={book.id}
                className="relative max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition duration-300"
              >
                <h5 className="mb-2 text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {book.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Written by {book.author_name}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEditBook(book)}
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="text-red-500 hover:text-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </div>

                {index === 2 && (
                  <button
                    onClick={handleAddBook}
                    className="absolute -top-12 right-0 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Add Book
                  </button>
                )}
              </div>
            ))}
          </div>

          {books.length > booksPerPage && (
            <div className="flex flex-wrap justify-center mt-6 gap-2">
              {[...Array(Math.ceil(books.length / booksPerPage))].map(
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-4 py-2 border rounded-lg transition duration-200 ${
                      currentPage === i + 1
                        ? "bg-indigo-500 text-white shadow-md"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {formData.isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/4">
            <h3 className="text-2xl font-semibold mb-4">
              {formData.isEditing ? "Edit Book" : "Add Book"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="bookTitle"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  id="bookTitle"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="author"
                >
                  Author
                </label>
                <select
                  id="author"
                  name="selectedAuthor"
                  value={formData.selectedAuthor}
                  onChange={handleChange}
                  className="border p-2 w-full"
                  required
                >
                  <option value="">Select an author</option>
                  {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {formData.isEditing ? "Update Book" : "Add Book"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
