import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../actions/shoppingCartActions';

const initialState = {
  items: [],
  cart: null,
  payment: null,
  address: null
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case CLEAR_CART:
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};

export default shoppingCartReducer;
