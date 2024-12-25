import axios from 'axios';
import { API_URL } from './authService';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Request interceptor - her istekte token ekler
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Token kontrolü yapılıyor mu kontrol edelim
const token = localStorage.getItem('token');
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = token; // Bearer prefix'i olmadan
}

export default axiosInstance; 