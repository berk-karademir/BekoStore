export const loginThunk = ({ email, password }) => async (dispatch) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to log in');
      }
  
      const data = await response.json();
  
      // Dispatch success action
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return { payload: data };
    } catch (error) {
      // Dispatch failure action
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { error: error.message };
    }
  };