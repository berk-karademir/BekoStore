import {
  SET_PRODUCT_LIST,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_TOTAL,
  SET_SORT_OPTION,
  FETCH_PRODUCT_DETAIL_REQUEST,
  FETCH_PRODUCT_DETAIL_SUCCESS,
  FETCH_PRODUCT_DETAIL_FAILURE
} from '../actions/productActions';

const initialState = {
  productList: [],
  fetchState: 'idle',
  limit: 10,
  offset: 0,
  total: 0,
  sortOption: 'none',
  currentProduct: null,
  productDetailLoading: false,
  productDetailError: null
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
    case FETCH_PRODUCT_DETAIL_REQUEST:
      return {
        ...state,
        productDetailLoading: true,
        productDetailError: null,
        currentProduct: null
      };
    case FETCH_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetailLoading: false,
        currentProduct: action.payload
      };
    case FETCH_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        productDetailLoading: false,
        productDetailError: action.payload
      };
    default:
      return state;
  }
};

export default productReducer;
