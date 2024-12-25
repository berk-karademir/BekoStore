export const SET_PRODUCT_LIST = 'SET_PRODUCT_LIST';
export const SET_FETCH_STATE = 'SET_FETCH_STATE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_OFFSET = 'SET_OFFSET';
export const SET_TOTAL = 'SET_TOTAL';

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
