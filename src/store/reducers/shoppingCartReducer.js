import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_QUANTITY } from '../actions/shoppingCartActions';

const initialState = {
  items: [],
  cart: null,
  payment: null,
  address: null
};

// Local storage'dan sepet verilerini al
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  try {
    initialState.items = JSON.parse(savedCart);
  } catch (e) {
    console.error('Error parsing cart from localStorage:', e);
  }
}

const shoppingCartReducer = (state = initialState, action) => {
  let newState;
  
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }]
        };
      }
      // Sepeti local storage'a kaydet
      localStorage.setItem('cart', JSON.stringify(newState.items));
      return newState;

    case REMOVE_FROM_CART:
      newState = {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
      localStorage.setItem('cart', JSON.stringify(newState.items));
      return newState;

    case CLEAR_CART:
      localStorage.removeItem('cart');
      return {
        ...state,
        items: []
      };

    case UPDATE_QUANTITY:
      newState = {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
      localStorage.setItem('cart', JSON.stringify(newState.items));
      return newState;

    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      };

    case 'SET_PAYMENT':
      return {
        ...state,
        payment: action.payload
      };

    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.payload
      };

    default:
      return state;
  }
};

export default shoppingCartReducer;
