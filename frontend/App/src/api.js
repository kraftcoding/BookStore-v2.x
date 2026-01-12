import axios from 'axios';

const API_BASE = '/api';

export const getItems = async () => {
  const { data } = await axios.get(`${API_BASE}/items`);
  return data;
};

export const createItem = async (item) => {
  const { data } = await axios.post(`${API_BASE}/items`, item);
  return data;
};