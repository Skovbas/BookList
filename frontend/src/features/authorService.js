import axios from "axios";

const API_URL = "http://127.0.0.1:8000/authors/";

const getAuthors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

const authorService = {
  getAuthors,
};

export default authorService;
