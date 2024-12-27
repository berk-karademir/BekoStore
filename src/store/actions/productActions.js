import { fetchProducts } from "../../services/authService";
import axiosInstance from "../../services/axiosInstance";

export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';
export const SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT';
export const FETCH_PRODUCT_DETAIL_REQUEST = "FETCH_PRODUCT_DETAIL_REQUEST";
export const FETCH_PRODUCT_DETAIL_SUCCESS = "FETCH_PRODUCT_DETAIL_SUCCESS";
export const FETCH_PRODUCT_DETAIL_FAILURE = "FETCH_PRODUCT_DETAIL_FAILURE";

export const setProductList = (products) => ({
  type: SET_PRODUCT_LIST,
  payload: products
});

export const setFetchState = (state) => ({
  type: SET_FETCH_STATE,
  payload: state
});

export const setLimit = (limit) => ({
  type: SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: SET_OFFSET,
  payload: offset
});

export const setTotal = (total) => ({
  type: SET_TOTAL,
  payload: total
});

export const setSortOption = (option) => ({
  type: SET_SORT_OPTION,
  payload: option
});

export const setCurrentProduct = (product) => ({
  type: SET_CURRENT_PRODUCT,
  payload: product
});

// Thunk action creator for sorting products
export const sortProducts = (option) => (dispatch, getState) => {
  const { productList } = getState().product;
  let sortedProducts = [...productList];

  switch (option) {
    case "price-asc":
      sortedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      break;
    case "rating-asc":
      sortedProducts.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
      break;
    case "rating-desc":
      sortedProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      break;
    default:
      break;
  }

  dispatch(setProductList(sortedProducts));
  dispatch(setSortOption(option));
};

// Thunk action creator for pagination
export const handlePagination = (newOffset) => (dispatch) => {
  dispatch(setOffset(newOffset));
};

// Thunk action creator for fetching products with parameters
export const fetchProductsWithParams = (params) => async (dispatch) => {
  dispatch(setFetchState('loading'));
  try {
    // Mobil için sayfa başına 4 ürün
    const limit = 4;
    const offset = Math.max(0, parseInt(params?.offset) || 0);
    const queryString = `?limit=${limit}&offset=${offset}${params?.category ? `&category=${params.category}` : ''}${params?.sort ? `&sort=${params.sort}` : ''}`;
    
    const response = await fetchProducts(queryString);
    
    if (response && Array.isArray(response.products)) {
      dispatch(setProductList(response.products));
      dispatch(setTotal(response.total));
      dispatch(setLimit(limit));
      dispatch(setOffset(offset));
      dispatch(setFetchState('success'));
    } else {
      console.error('Geçersiz API yanıtı:', response);
      dispatch(setFetchState('error'));
    }
  } catch (error) {
    console.error('Ürünler yüklenirken hata:', error);
    dispatch(setFetchState('error'));
  }
};

// Thunk action creator for fetching product detail
export const fetchProductDetail = (productId) => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_DETAIL_REQUEST });
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    dispatch({
      type: FETCH_PRODUCT_DETAIL_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_PRODUCT_DETAIL_FAILURE,
      payload: error.message
    });
  }
};
