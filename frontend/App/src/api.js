import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getBooks = async () => {
  const { data } = await axios.get(`${API_BASE}/books`);
  return data;
};

export const createBook = async (book) => {
  const { data } = await axios.post(`${API_BASE}/books`, book);
  return data;
};