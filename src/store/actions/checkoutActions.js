import { toast } from 'react-toastify';
import axiosInstance from '../../services/axiosInstance';
import { clearCart } from './shoppingCartActions';

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
export const SET_SAVED_CARDS = 'SET_SAVED_CARDS';
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD';
export const SET_SHOW_CARD_FORM = 'SET_SHOW_CARD_FORM';
export const SET_EDIT_CARD = 'SET_EDIT_CARD';

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

const validateCardName = (name) => {
  return name && name.trim().length >= 3;
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

// Card Related Action Creators
export const setSavedCards = (cards) => ({
  type: SET_SAVED_CARDS,
  payload: cards
});

export const setSelectedCard = (card) => ({
  type: SET_SELECTED_CARD,
  payload: card
});

export const setShowCardForm = (show) => ({
  type: SET_SHOW_CARD_FORM,
  payload: show
});

export const setEditCard = (card) => ({
  type: SET_EDIT_CARD,
  payload: card
});

// Card Related Thunk Actions
export const fetchSavedCards = () => async (dispatch) => {
  try {
    dispatch(setLoading({ cards: true }));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const response = await axiosInstance.get('/user/card', {
      headers: { Authorization: token }
    });

    const cardList = Array.isArray(response.data) ? response.data : [];
    dispatch(setSavedCards(cardList));
    
    if (cardList.length > 0) {
      dispatch(setSelectedCard(cardList[0]));
    }
  } catch (error) {
    console.error('Error fetching cards:', error);
    if (error.response?.status === 401) {
      toast.error('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
      localStorage.removeItem('token');
    } else {
      toast.error('Kartlar yüklenirken bir hata oluştu');
    }
    dispatch(setSavedCards([]));
  } finally {
    dispatch(setLoading({ cards: false }));
  }
};

export const saveCard = (cardData) => async (dispatch) => {
  try {
    dispatch(setLoading({ saveCard: true }));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    await axiosInstance.post('/user/card', cardData, {
      headers: { Authorization: token }
    });
    
    toast.success('Kart başarıyla kaydedildi');
    dispatch(fetchSavedCards());
    dispatch(setShowCardForm(false));
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
      localStorage.removeItem('token');
    } else {
      toast.error('Kart kaydedilirken bir hata oluştu');
    }
  } finally {
    dispatch(setLoading({ saveCard: false }));
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    dispatch(setLoading({ updateCard: true }));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    await axiosInstance.put('/user/card', cardData, {
      headers: { Authorization: token }
    });
    
    toast.success('Kart başarıyla güncellendi');
    dispatch(fetchSavedCards());
    dispatch(setEditCard(null));
    dispatch(setShowCardForm(false));
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
      localStorage.removeItem('token');
    } else {
      toast.error('Kart güncellenirken bir hata oluştu');
    }
  } finally {
    dispatch(setLoading({ updateCard: false }));
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  if (window.confirm('Bu kartı silmek istediğinizden emin misiniz?')) {
    try {
      dispatch(setLoading({ deleteCard: true }));
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token bulunamadı');
      }

      await axiosInstance.delete(`/user/card/${cardId}`, {
        headers: { Authorization: token }
      });
      
      toast.success('Kart başarıyla silindi');
      dispatch(fetchSavedCards());
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
        localStorage.removeItem('token');
      } else {
        toast.error('Kart silinirken bir hata oluştu');
      }
    } finally {
      dispatch(setLoading({ deleteCard: false }));
    }
  }
};

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
  const { cardInfo, selectedAddress, selectedCard, acceptTerms } = checkoutState;
  const newErrors = {};

  if (!selectedAddress) {
    newErrors.address = 'Lütfen bir teslimat adresi seçin';
  }

  if (!selectedCard) {
    if (!validateCardName(cardInfo.cardName)) {
      newErrors.cardName = 'Geçerli bir kart sahibi adı girin';
    }

    if (!validateCardNumber(cardInfo.cardNumber)) {
      newErrors.cardNumber = 'Geçersiz kart numarası';
    }

    if (!validateCVV(cardInfo.cvv)) {
      newErrors.cvv = 'Geçersiz CVV';
    }

    if (!validateExpiry(cardInfo.expiryMonth, cardInfo.expiryYear)) {
      newErrors.expiry = 'Geçersiz son kullanma tarihi';
    }
  }

  if (!acceptTerms) {
    newErrors.terms = 'Lütfen şartları ve koşulları kabul edin';
  }

  dispatch(setErrors(newErrors));
  return Object.keys(newErrors).length === 0;
};

export const submitPayment = (checkoutState, cartItems, calculateTotal) => async (dispatch) => {
  if (!dispatch(validateCheckoutForm(checkoutState))) {
    return;
  }

  const { cardInfo, selectedAddress, selectedCard } = checkoutState;

  try {
    dispatch(setLoading({ payment: true }));
    
    const paymentData = {
      address_id: selectedAddress.id,
      order_date: new Date().toISOString(),
      card_no: selectedCard ? parseInt(selectedCard.card_no) : parseInt(cardInfo.cardNumber.replace(/\s/g, '')),
      card_name: selectedCard ? selectedCard.name_on_card : cardInfo.cardName,
      card_expire_month: selectedCard ? selectedCard.expire_month : parseInt(cardInfo.expiryMonth),
      card_expire_year: selectedCard ? selectedCard.expire_year : parseInt(cardInfo.expiryYear),
      card_ccv: parseInt(cardInfo.cvv),
      price: calculateTotal() + 29.99,
      products: cartItems.map(item => ({
        product_id: item.id,
        count: item.quantity,
        detail: item.selectedVariant ? `${item.selectedVariant.color} - ${item.selectedVariant.size}` : ''
      }))
    };

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token bulunamadı');
    }

    const response = await axiosInstance.post('/order', paymentData, {
      headers: { Authorization: token }
    });

    toast.success('🎉 Tebrikler! Siparişiniz başarıyla oluşturuldu!');
    dispatch(resetCheckout());
    dispatch(clearCart());
    
    return {
      orderId: response.data.id,
      success: true
    };
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Sipariş oluşturulurken bir hata oluştu';
    toast.error(errorMessage);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    throw error;
  } finally {
    dispatch(setLoading({ payment: false }));
  }
}; 