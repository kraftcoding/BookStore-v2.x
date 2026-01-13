import axios from 'axios';
const axiosInstance = axios.create({
  //baseURL: 'http://localhost:5000/api',
  baseURL: 'http://localhost:5225/api',
});
export default axiosInstance;
