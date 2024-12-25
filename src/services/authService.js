import axios from 'axios';

export const API_URL = 'https://workintech-fe-ecommerce.onrender.com';

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
    console.log('Full Login Response:', response);
    console.log('Login Response Data:', response.data);
    
    // Create a user object with the received data
    const userData = {
      name: response.data.name,
      email: response.data.email,
      role_id: response.data.role_id,
      token: response.data.token
    };
    
    console.log('Processed User Data:', userData);
    return userData;
  } catch (error) {
    console.error('Login Error:', error);
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

export const fetchProducts = async () => {
  try {
    const response = await authApi.get('/products');
    if (!response.data.products) {
      throw new Error('Ürün verisi bulunamadı');
    }
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Ürünler yüklenirken bir hata oluştu');
  }
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await authApi.get('/verify', {
      headers: {
        Authorization: token // Bearer prefix'i olmadan
      }
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    delete authApi.defaults.headers.common['Authorization'];
    throw error;
  }
};

