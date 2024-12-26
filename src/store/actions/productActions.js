import { fetchProducts } from "../../services/authService";

export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_TOTAL = 'SET_TOTAL';
export const SET_SORT_OPTION = 'SET_SORT_OPTION';
export const SORT_PRODUCTS = 'SORT_PRODUCTS';

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
      sortedProducts.sort((a, b) => parseFloat(b.rating) - parseFloat(b.rating));
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

// Thunk action creator for fetching products
export const fetchProductsAction = () => async (dispatch) => {
  dispatch(setFetchState("FETCHING"));
  
  try {
    const products = await fetchProducts();
    
    if (Array.isArray(products)) {
      dispatch(setProductList(products));
      dispatch(setTotal(products.length));
      dispatch(setFetchState("FETCHED"));
    } else {
      console.error("Invalid products data:", products);
      dispatch(setFetchState("ERROR"));
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(setFetchState("ERROR"));
  }
};
