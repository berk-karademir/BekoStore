import axios from 'axios';
import { setRoles } from './clientActions';

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles.length > 0) return;

  dispatch({ type: 'SET_FETCH_STATE', payload: 'FETCHING' });

  try {
    const response = await axios.get('/api/roles'); // Replace with your API endpoint
    dispatch(setRoles(response.data));
    dispatch({ type: 'SET_FETCH_STATE', payload: 'FETCHED' });
  } catch (error) {
    dispatch({ type: 'SET_FETCH_STATE', payload: 'FAILED' });
    console.error('Failed to fetch roles:', error);
  }
};
