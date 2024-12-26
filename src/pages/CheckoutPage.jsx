import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '@/layout/Header';
import AddressSection from '../components/checkout/AddressSection';
import PaymentSection from '../components/checkout/PaymentSection';
import CardSection from '../components/checkout/CardSection';
import OrderSummary from '../components/checkout/OrderSummary';
import {
  setCardInfo,
  setAcceptTerms,
  setShowAddressForm,
  setSelectedAddress,
  setEditAddress,
  fetchAddresses,
  deleteAddress,
  submitPayment
} from '../store/actions/checkoutActions';

function CheckoutPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const {
    cardInfo,
    acceptTerms,
    showAddressForm,
    addresses,
    selectedAddress,
    editAddress,
    selectedCard,
    isLoading,
    errors
  } = useSelector((state) => state.checkout);
  
  const { items: cartItems } = useSelector((state) => state.shoppingCart);
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      history.push('/cart');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      history.push('/login');
      return;
    }

    dispatch(fetchAddresses());
  }, [dispatch, cartItems, history]);

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitPayment({ cardInfo, selectedAddress, selectedCard, acceptTerms }, cartItems, calculateTotal))
      .then((response) => {
        if (response) {
          history.push('/order-success', { orderId: response.orderId });
        }
      })
      .catch(() => {
        history.push('/cart');
      });
  };

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <AddressSection 
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={(address) => dispatch(setSelectedAddress(address))}
                showAddressForm={showAddressForm}
                setShowAddressForm={(show) => dispatch(setShowAddressForm(show))}
                editAddress={editAddress}
                setEditAddress={(address) => dispatch(setEditAddress(address))}
                isLoading={isLoading}
                handleDeleteAddress={(id) => dispatch(deleteAddress(id))}
                fetchAddresses={() => dispatch(fetchAddresses())}
                errors={errors}
              />

              <CardSection />

              <PaymentSection 
                cardInfo={cardInfo}
                setCardInfo={(info) => dispatch(setCardInfo(info))}
                acceptTerms={acceptTerms}
                setAcceptTerms={(accept) => dispatch(setAcceptTerms(accept))}
                errors={errors}
                formatCardNumber={formatCardNumber}
                selectedCard={selectedCard}
              />
            </div>

            <div className="md:col-span-1">
              <OrderSummary 
                cartItems={cartItems}
                calculateTotal={calculateTotal}
                handleSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPage; 