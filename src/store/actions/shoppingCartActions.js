export const setCart = (cart) => ({
    type: 'SET_CART',
    payload: cart
});

export const setPayment = (payment) => ({
    type: 'SET_PAYMENT',
    payload: payment
});

export const setAddress = (address) => ({
    type: 'SET_ADDRESS',
    payload: address
});

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: { ...product, quantity: 1 }
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const updateQuantity = (productId, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productId, quantity }
}); 
