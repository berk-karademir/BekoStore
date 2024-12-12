import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
const LogIn = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [user, setUser] = useState(null); // Local state to store user info
  const history = useHistory();
  const location = useLocation();
  const api = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
  })
  

  const onSubmit = async (formData) => {
    const { email, password, remember } = formData;
    try {
      // Ensure the data format matches the API requirements
      const payload = {
        email: email,
        password: password,
      };
  
      console.log("Sending payload:", payload); // Log payload for debugging
  
      const response = await api.post('/login', payload);
  
      console.log("Server response:", response); // Log response for debugging
  
      const userData = response.data;
  
      // Save token to localStorage if remember me is checked
      if (remember) {
        localStorage.setItem('token', userData.token);
      }
  
      // Update local state with user info
      setUser(userData);
  
      // Redirect to previous page or home
      const redirectTo = location.state?.from || '/';
      history.push(redirectTo);
    } catch (error) {
      console.error("Error during login:", error); // Log error for debugging
      const errorMessage = error.response?.data?.message || error.message || 'Failed to log in';
      toast.error('Login failed: ' + errorMessage);
    }
  };

  

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="remember">
            <input id="remember" type="checkbox" {...register('remember')} />
            Remember Me
          </label>
        </div>

        <button type="submit">Log In</button>
      </form>

      
      
    </div>
  );
};

export default LogIn;
