import {
  SET_CARD_INFO,
  SET_ACCEPT_TERMS,
  SET_SHOW_ADDRESS_FORM,
  SET_ADDRESSES,
  SET_SELECTED_ADDRESS,
  SET_EDIT_ADDRESS,
  SET_LOADING,
  SET_ERRORS,
  RESET_CHECKOUT,
  SET_SAVED_CARDS,
  SET_SELECTED_CARD,
  SET_SHOW_CARD_FORM,
  SET_EDIT_CARD
} from '../actions/checkoutActions';

const initialState = {
  cardInfo: {
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    use3DSecure: true
  },
  acceptTerms: false,
  showAddressForm: false,
  addresses: [],
  selectedAddress: null,
  editAddress: null,
  savedCards: [],
  selectedCard: null,
  showCardForm: false,
  editCard: null,
  isLoading: {
    addresses: false,
    payment: false,
    deleteAddress: false,
    cards: false,
    saveCard: false,
    updateCard: false,
    deleteCard: false
  },
  errors: {}
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CARD_INFO:
      return {
        ...state,
        cardInfo: {
          ...state.cardInfo,
          ...action.payload
        }
      };

    case SET_ACCEPT_TERMS:
      return {
        ...state,
        acceptTerms: action.payload
      };

    case SET_SHOW_ADDRESS_FORM:
      return {
        ...state,
        showAddressForm: action.payload
      };

    case SET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload
      };

    case SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.payload
      };

    case SET_EDIT_ADDRESS:
      return {
        ...state,
        editAddress: action.payload
      };

    case SET_SAVED_CARDS:
      return {
        ...state,
        savedCards: action.payload
      };

    case SET_SELECTED_CARD:
      return {
        ...state,
        selectedCard: action.payload
      };

    case SET_SHOW_CARD_FORM:
      return {
        ...state,
        showCardForm: action.payload
      };

    case SET_EDIT_CARD:
      return {
        ...state,
        editCard: action.payload
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          ...action.payload
        }
      };

    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };

    case RESET_CHECKOUT:
      return initialState;

    default:
      return state;
  }
};

export default checkoutReducer; 