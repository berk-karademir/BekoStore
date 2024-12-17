import axios from 'axios';

const API_URL = 'https://workintech-fe-ecommerce.onrender.com';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await authApi.post('/signup', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await authApi.post('/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchRoles = async () => {
  try {
    const response = await authApi.get('/roles');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
