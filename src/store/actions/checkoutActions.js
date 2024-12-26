import { toast } from 'react-toastify';
import axiosInstance from '../../services/axiosInstance';

// Action Types
export const SET_CARD_INFO = 'SET_CARD_INFO';
export const SET_ACCEPT_TERMS = 'SET_ACCEPT_TERMS';
export const SET_SHOW_ADDRESS_FORM = 'SET_SHOW_ADDRESS_FORM';
export const SET_ADDRESSES = 'SET_ADDRESSES';
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS';
export const SET_EDIT_ADDRESS = 'SET_EDIT_ADDRESS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERRORS = 'SET_ERRORS';
export const RESET_CHECKOUT = 'RESET_CHECKOUT';

// Validation Functions
const validateCardNumber = (number) => {
  const cleanNumber = number.replace(/\s/g, '');
  return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(cleanNumber);
};

const validateCVV = (cvv) => {
  return /^[0-9]{3,4}$/.test(cvv);
};

const validateExpiry = (month, year) => {
  if (!month || !year) return false;
  const expiry = new Date(year, month - 1);
  const today = new Date();
  return expiry > today;
};

// Action Creators
export const setCardInfo = (cardInfo) => ({
  type: SET_CARD_INFO,
  payload: cardInfo
});

export const setAcceptTerms = (accept) => ({
  type: SET_ACCEPT_TERMS,
  payload: accept
});

export const setShowAddressForm = (show) => ({
  type: SET_SHOW_ADDRESS_FORM,
  payload: show
});

export const setAddresses = (addresses) => ({
  type: SET_ADDRESSES,
  payload: addresses
});

export const setSelectedAddress = (address) => ({
  type: SET_SELECTED_ADDRESS,
  payload: address
});

export const setEditAddress = (address) => ({
  type: SET_EDIT_ADDRESS,
  payload: address
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading
});

export const setErrors = (errors) => ({
  type: SET_ERRORS,
  payload: errors
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT
});

// Thunk Actions
export const fetchAddresses = () => async (dispatch) => {
  try {
    dispatch(setLoading({ addresses: true }));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const response = await axiosInstance.get('/user/address', {
      headers: { Authorization: token }
    });

    const addressList = Array.isArray(response.data) ? response.data : [];
    dispatch(setAddresses(addressList));
    
    if (addressList.length > 0) {
      dispatch(setSelectedAddress(addressList[0]));
    }
  } catch (error) {
    console.error('Error fetching addresses:', error);
    if (error.response?.status === 401) {
      toast.error('Your session has expired. Please login again.');
      localStorage.removeItem('token');
    } else {
      toast.error('Error loading addresses');
    }
    dispatch(setAddresses([]));
  } finally {
    dispatch(setLoading({ addresses: false }));
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this address?')) {
    try {
      dispatch(setLoading({ deleteAddress: true }));
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      await axiosInstance.delete(`/user/address/${addressId}`, {
        headers: { Authorization: token }
      });
      
      toast.success('Address deleted');
      dispatch(fetchAddresses());
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please login again.');
        localStorage.removeItem('token');
      } else {
        toast.error('Error deleting address');
      }
    } finally {
      dispatch(setLoading({ deleteAddress: false }));
    }
  }
};

export const validateCheckoutForm = (checkoutState) => (dispatch) => {
  const { cardInfo, selectedAddress, acceptTerms } = checkoutState;
  const newErrors = {};

  if (!selectedAddress) {
    newErrors.address = 'Please select a delivery address';
  }

  if (!validateCardNumber(cardInfo.cardNumber)) {
    newErrors.cardNumber = 'Invalid card number';
  }

  if (!validateCVV(cardInfo.cvv)) {
    newErrors.cvv = 'Invalid CVV';
  }

  if (!validateExpiry(cardInfo.expiryMonth, cardInfo.expiryYear)) {
    newErrors.expiry = 'Invalid expiry date';
  }

  if (!acceptTerms) {
    newErrors.terms = 'Please accept the terms and conditions';
  }

  dispatch(setErrors(newErrors));
  return Object.keys(newErrors).length === 0;
};

export const submitPayment = (checkoutState, cartItems, calculateTotal) => async (dispatch) => {
  if (!dispatch(validateCheckoutForm(checkoutState))) {
    return;
  }

  const { cardInfo, selectedAddress } = checkoutState;

  try {
    dispatch(setLoading({ payment: true }));
    
    const paymentData = {
      addressId: selectedAddress.id,
      cardInfo: {
        number: cardInfo.cardNumber.replace(/\s/g, ''),
        expMonth: cardInfo.expiryMonth,
        expYear: cardInfo.expiryYear,
        cvv: cardInfo.cvv
      },
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      })),
      use3DSecure: cardInfo.use3DSecure,
      totalAmount: calculateTotal() + 29.99
    };

    const response = await axiosInstance.post('/order', paymentData);
    
    if (response.data.requires3D) {
      const secure3DResponse = await axiosInstance.post('/order', {
        paymentId: response.data.paymentId
      });
      window.location.href = secure3DResponse.data.redirectUrl;
    } else {
      toast.success('Payment completed successfully!');
      dispatch(resetCheckout());
      return response.data;
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'An error occurred during payment';
    toast.error(errorMessage);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    throw error;
  } finally {
    dispatch(setLoading({ payment: false }));
  }
}; 