
import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {tokenManager} from './tokenManager';



// const API_BASE_URL = 'http://localhost:5225/api';
 const API_BASE_URL = 'http://localhost:5000/api'; 

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - inject access token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    
    const accessToken = tokenManager.getAccessToken();   
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default apiClient;