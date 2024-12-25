import axios from "axios";
import { fetchRoles as fetchRolesAPI } from '../../services/authService';

// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const LOGOUT = 'LOGOUT';

// Action Creators
export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setRoles = (roles) => ({
    type: SET_ROLES,
    payload: roles
});

export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme
});

export const setLanguage = (language) => ({
    type: SET_LANGUAGE,
    payload: language
});

// Logout action
export const logout = () => {
    // Remove all user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return {
        type: LOGOUT
    };
};

// Thunk Action Creator for fetching roles
export const fetchRoles = () => async (dispatch) => {
    try {
        const roles = await fetchRolesAPI();
        dispatch({ type: SET_ROLES, payload: roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
