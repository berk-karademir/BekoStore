import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  timeout: 5000
});

export default authApi; 