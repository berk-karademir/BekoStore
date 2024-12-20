import axios from "axios";

// Action Creators
export const setUser = (user) => ({
    type: 'SET_USER',
    payload: user
});

export const setRoles = (roles) => ({
    type: 'SET_ROLES',
    payload: roles
});

export const setTheme = (theme) => ({
    type: 'SET_THEME',
    payload: theme
});

export const setLanguage = (language) => ({
    type: 'SET_LANGUAGE',
    payload: language
});

// Logout action
export const logout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type: 'LOGOUT'
    };
};

// Thunk Action Creator for fetching roles
const api = axios.create({
    baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

export const fetchRoles = () => async (dispatch) => {
    try {
        const response = await api.get('/roles');
        dispatch(setRoles(response.data));
    } catch (error) {
        console.error('Error fetching roles:', error);
    }
};
