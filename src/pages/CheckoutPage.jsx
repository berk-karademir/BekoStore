import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreditCard, Info, Loader } from 'lucide-react';
import AddressForm from '../components/AddressForm';
import axiosInstance from '../services/axiosInstance';
import { useSelector } from 'react-redux';

// Kart numarası validasyonu
const validateCardNumber = (number) => {
  const cleanNumber = number.replace(/\s/g, '');
  return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(cleanNumber);
};

// CVV validasyonu
const validateCVV = (cvv) => {
  return /^[0-9]{3,4}$/.test(cvv);
};

// Son kullanma tarihi validasyonu
const validateExpiry = (month, year) => {
  if (!month || !year) return false;
  const expiry = new Date(year, month - 1);
  const today = new Date();
  return expiry > today;
};

function CheckoutPage() {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const cartItems = shoppingCart?.cartItems || [];
  const calculateTotal = shoppingCart?.calculateTotal || (() => 0);
  
  const history = useHistory();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    use3DSecure: true // Varsayılan olarak 3D Secure aktif
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editAddress, setEditAddress] = useState(null);
  const [isLoading, setIsLoading] = useState({
    addresses: false,
    payment: false,
    deleteAddress: false
  });
  const [errors, setErrors] = useState({});

  // Sepet boş kontrolü
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      toast.error('Sepetiniz boş!');
      history.push('/cart');
      return;
    }
  }, [cartItems, history]);

  // Token kontrolü ve adres getirme
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Lütfen önce giriş yapın');
      history.push('/login');
      return;
    }

    // Token'ı axios instance'ına ekle
    axiosInstance.defaults.headers.common['Authorization'] = token;
    
    fetchAddresses();
  }, [history]);

  const fetchAddresses = async () => {
    try {
      setIsLoading(prev => ({ ...prev, addresses: true }));
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token bulunamadı');
      }

      const response = await axiosInstance.get('/user/address', {
        headers: {
          Authorization: token
        }
      });

      const addressList = Array.isArray(response.data) ? response.data : [];
      setAddresses(addressList);
      if (addressList.length > 0) {
        setSelectedAddress(addressList[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      if (error.response?.status === 401) {
        toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
        localStorage.removeItem('token');
        history.push('/login');
      } else {
        toast.error('Adresler yüklenirken bir hata oluştu');
      }
      setAddresses([]);
    } finally {
      setIsLoading(prev => ({ ...prev, addresses: false }));
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm('Bu adresi silmek istediğinizden emin misiniz?')) {
      try {
        setIsLoading(prev => ({ ...prev, deleteAddress: true }));
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token bulunamadı');
        }

        await axiosInstance.delete(`/user/address/${addressId}`, {
          headers: {
            Authorization: token
          }
        });
        
        toast.success('Adres silindi');
        fetchAddresses();
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error('Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.');
          localStorage.removeItem('token');
          history.push('/login');
        } else {
          toast.error('Adres silinirken bir hata oluştu');
        }
      } finally {
        setIsLoading(prev => ({ ...prev, deleteAddress: false }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!selectedAddress) {
      newErrors.address = 'Lütfen teslimat adresi seçin';
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

    if (!acceptTerms) {
      newErrors.terms = 'Lütfen şartları kabul edin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentSuccess = (paymentData) => {
    toast.success('Ödeme başarıyla tamamlandı!');
    history.push('/order-success', { orderId: paymentData.orderId });
  };

  const handlePaymentError = (error) => {
    const errorMessage = error.response?.data?.message || 'Ödeme işlemi sırasında bir hata oluştu';
    toast.error(errorMessage);
    
    if (error.response?.status === 401) {
      history.push('/login');
    }
  };

  const handle3DSecure = async (data) => {
    // 3D Secure işlemi için gerekli yönlendirme
    try {
      const response = await axiosInstance.post('/payment/3d-secure', {
        paymentId: data.paymentId
      });
      window.location.href = response.data.redirectUrl;
    } catch (error) {
      handlePaymentError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(prev => ({ ...prev, payment: true }));
      
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
        totalAmount: calculateTotal() + 29.99 // Kargo dahil toplam
      };

      const response = await axiosInstance.post('/payment', paymentData);
      
      if (response.data.requires3D) {
        await handle3DSecure(response.data);
      } else {
        handlePaymentSuccess(response.data);
      }
    } catch (error) {
      handlePaymentError(error);
    } finally {
      setIsLoading(prev => ({ ...prev, payment: false }));
    }
  };

  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, '');
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const addressSection = (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">1. Adres Bilgileri</h2>
        <button 
          onClick={() => setShowAddressForm(true)}
          className="text-blue-500 hover:text-blue-600"
          disabled={isLoading.addresses}
        >
          {isLoading.addresses ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            'Yeni Adres Ekle'
          )}
        </button>
      </div>

      {errors.address && (
        <p className="text-red-500 text-sm mb-2">{errors.address}</p>
      )}

      {!Array.isArray(addresses) || addresses.length === 0 ? (
        <p className="text-gray-500">Kayıtlı adresiniz bulunmamaktadır.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <div 
              key={address.id || Math.random()}
              className={`border p-4 rounded cursor-pointer ${
                selectedAddress?.id === address.id ? 'border-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{address.title}</span>
                <div className="space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditAddress(address);
                      setShowAddressForm(true);
                    }}
                    className="text-blue-500 hover:text-blue-600"
                    disabled={isLoading.deleteAddress}
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                    disabled={isLoading.deleteAddress}
                  >
                    {isLoading.deleteAddress ? (
                      <Loader className="animate-spin" size={16} />
                    ) : (
                      'Sil'
                    )}
                  </button>
                </div>
              </div>
              <p className="text-gray-600">
                {address.name} {address.surname}
                <br />
                {address.neighborhood}, {address.district}/{address.city}
                <br />
                {address.phone}
              </p>
            </div>
          ))}
        </div>
      )}

      {showAddressForm && (
        <AddressForm
          onClose={() => {
            setShowAddressForm(false);
            setEditAddress(null);
          }}
          editAddress={editAddress}
          onAddressUpdate={fetchAddresses}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {addressSection}

            {/* Ödeme Seçenekleri */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-6">2. Ödeme Seçenekleri</h2>
              
              {/* Kart Bilgileri Formu */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Numarası
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cardNumber ? 'border-red-500' : ''
                      }`}
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({
                        ...cardInfo,
                        cardNumber: formatCardNumber(e.target.value)
                      })}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Son Kullanma Tarihi
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          className={`px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                            errors.expiry ? 'border-red-500' : ''
                          }`}
                          value={cardInfo.expiryMonth}
                          onChange={(e) => setCardInfo({...cardInfo, expiryMonth: e.target.value})}
                        >
                          <option value="">Ay</option>
                          {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                            <option key={month} value={month.toString().padStart(2, '0')}>
                              {month.toString().padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        <select 
                          className={`px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                            errors.expiry ? 'border-red-500' : ''
                          }`}
                          value={cardInfo.expiryYear}
                          onChange={(e) => setCardInfo({...cardInfo, expiryYear: e.target.value})}
                        >
                          <option value="">Yıl</option>
                          {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                      {errors.expiry && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                        <span className="inline-block ml-1 text-gray-400 cursor-help">
                          <Info size={16} />
                        </span>
                      </label>
                      <input
                        type="password"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
                          errors.cvv ? 'border-red-500' : ''
                        }`}
                        placeholder="000"
                        maxLength="4"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="3dsecure"
                    checked={cardInfo.use3DSecure}
                    onChange={(e) => setCardInfo({...cardInfo, use3DSecure: e.target.checked})}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="3dsecure" className="text-sm text-gray-700">
                    3D Secure ile ödemek istiyorum
                  </label>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className={`rounded focus:ring-blue-500 ${
                      errors.terms ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Ön bilgilendirme formunu ve mesafeli satış sözleşmesini okudum, onaylıyorum
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-red-500 text-sm">{errors.terms}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4">
                {cartItems && cartItems.length > 0 ? (
                  <>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{(item.price * item.quantity).toFixed(2)} TL</span>
                      </div>
                    ))}
                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span>Ürünlerin Toplamı</span>
                        <span>{calculateTotal().toFixed(2)} TL</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span>Kargo Ücreti</span>
                        <span>29,99 TL</span>
                      </div>
                      <div className="flex justify-between mt-4 font-bold text-lg">
                        <span>Toplam</span>
                        <span>{(calculateTotal() + 29.99).toFixed(2)} TL</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">Sepetinizde ürün bulunmamaktadır.</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isLoading.payment || !cartItems || cartItems.length === 0}
                  className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                    isLoading.payment || !cartItems || cartItems.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading.payment ? (
                    <div className="flex items-center justify-center">
                      <Loader className="animate-spin mr-2" size={20} />
                      İşleniyor...
                    </div>
                  ) : (
                    'Ödemeyi Tamamla'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 