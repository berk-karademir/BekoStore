// Get stored user data if it exists
let initialUser = null;
try {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        initialUser = JSON.parse(storedUser);
    }
} catch (error) {
    console.error('Error loading stored user data:', error);
    initialUser = null;
}

const initialState = {
    user: initialUser,
    addressList: [],
    creditCards: [],
    roles: [],
    theme: 'light',
    language: 'en'
};

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_ROLES':
            return {
                ...state,
                roles: action.payload
            };
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            };
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                addressList: [],
                creditCards: [],
                roles: []
            };
        default:
            return state;
    }
};

export default clientReducer;
