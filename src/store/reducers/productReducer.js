import {
  SET_PRODUCT_LIST,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_TOTAL,
  SET_SORT_OPTION
} from '../actions/productActions';

const initialState = {
  productList: [],
  fetchState: 'NOT_FETCHED', // NOT_FETCHED, FETCHING, FETCHED, ERROR
  limit: 4,
  offset: 0,
  total: 0,
  sortOption: 'none'
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload
      };
    case SET_FETCH_STATE:
      return {
        ...state,
        fetchState: action.payload
      };
    case SET_LIMIT:
      return {
        ...state,
        limit: action.payload
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.payload
      };
    case SET_TOTAL:
      return {
        ...state,
        total: action.payload
      };
    case SET_SORT_OPTION:
      return {
        ...state,
        sortOption: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
