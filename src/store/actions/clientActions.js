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

// Thunk Action Creator for roles
export const fetchRoles = () => async (dispatch, getState) => {
    const { roles } = getState().client;
    
    // Only fetch if roles are empty
    if (roles.length === 0) {
        try {
            // Replace this with your actual API call
            const response = await fetch('/api/roles');
            const data = await response.json();
            dispatch(setRoles(data));
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    }
};
