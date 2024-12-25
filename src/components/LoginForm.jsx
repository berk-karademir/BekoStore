const handleLogin = async (values) => {
  try {
    const response = await login(values);
    if (values.rememberMe) {
      localStorage.setItem('token', response.token);
    } else {
      sessionStorage.setItem('token', response.token);
    }
    // ...
  } catch (error) {
    // ...
  }
}; 