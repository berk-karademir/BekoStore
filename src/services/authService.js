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
    const endpoints = [
      '/products',
      '/products?category=1',
      '/products?category=2',
      '/products?category=3'
    ];

    // Perform all GET requests in parallel
    const responses = await Promise.all(endpoints.map(endpoint => authApi.get(endpoint)));

    // Extract and combine the product data from all responses
    const allProducts = responses.flatMap(response => response.data.products);

    console.log('Combined Products:', allProducts);
    return allProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error.response?.data || error.message;
  }
};

