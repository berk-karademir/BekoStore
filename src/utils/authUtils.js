export const handleAuthError = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  return error.message || 'An unexpected error occurred';
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    return true;
  }
  return false;
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const formatUserData = (formData, selectedRole) => {
  const userData = {
    email: formData.email,
    password: formData.password,
    name: formData.name,
    role_id: formData.role_id
  };

  if (selectedRole === 'store') {
    userData.store = {
      name: formData.storeName,
      phone: formData.storePhone,
      address: formData.storeAddress
    };
  }

  return userData;
};
