import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreditCard, Info } from 'lucide-react';
import AddressForm from '../components/AddressForm';
import axiosInstance from '../services/axiosInstance';

function CheckoutPage() {
  const { cartItems, calculateTotal } = useCart();
  const history = useHistory();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit-card');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    use3DSecure: false
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Lütfen önce giriş yapın');
      history.push('/login');
      return;
    }
    fetchAddresses();
  }, [history]);

  const fetchAddresses = async () => {
    try {
      const response = await axiosInstance.get('/user/address');
      const addressList = Array.isArray(response.data) ? response.data : [];
      setAddresses(addressList);
      if (addressList.length > 0) {
        setSelectedAddress(addressList[0]);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setAddresses([]);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await axiosInstance.delete(`/user/address/${addressId}`);
      toast.success('Adres silindi');
      fetchAddresses();
    } catch (error) {
      toast.error('Adres silinirken bir hata oluştu');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast.error('Lütfen şartları kabul edin');
      return;
    }
    // Ödeme işlemi burada gerçekleştirilecek
    toast.success('Siparişiniz alındı!');
    history.push('/order-success');
  };

  const addressSection = (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">1. Adres Bilgileri</h2>
        <button 
          onClick={() => setShowAddressForm(true)}
          className="text-blue-500 hover:text-blue-600"
        >
          Yeni Adres Ekle
        </button>
      </div>

      {!Array.isArray(addresses) || addresses.length === 0 ? (
        <p className="text-gray-500">Kayıtlı adresiniz bulunmamaktadır.</p>
      ) : (
        <div className="space-y-4">
          {addresses.map(address => (
            <div 
              key={address.id || Math.random()}
              className={`border p-4 rounded cursor-pointer ${
                selectedAddress?.id === address.id ? 'border-blue-500' : ''
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
                  >
                    Düzenle
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address.id);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    Sil
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
                      className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0000 0000 0000 0000"
                      maxLength="19"
                      value={cardInfo.cardNumber}
                      onChange={(e) => setCardInfo({...cardInfo, cardNumber: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Son Kullanma Tarihi
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select 
                          className="px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                          className="px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          value={cardInfo.expiryYear}
                          onChange={(e) => setCardInfo({...cardInfo, expiryYear: e.target.value})}
                        >
                          <option value="">Yıl</option>
                          {Array.from({length: 10}, (_, i) => new Date().getFullYear() + i).map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                        <span className="inline-block ml-1 text-gray-400 cursor-help">
                          <Info size={16} />
                        </span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="000"
                        maxLength="3"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                      />
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
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Sipariş Özeti */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-6">
              <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Ürünün Toplamı</span>
                  <span>{calculateTotal()} TL</span>
                </div>
                <div className="flex justify-between">
                  <span>Kargo Toplam</span>
                  <span>29,99 TL</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>150 TL ve Üzeri Kargo Bedava</span>
                  <span>-29,99 TL</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Toplam</span>
                  <span>{calculateTotal()} TL</span>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      <span className="text-blue-500 hover:text-blue-600 cursor-pointer">Ön Bilgilendirme Koşulları</span>'nı ve{' '}
                      <span className="text-blue-500 hover:text-blue-600 cursor-pointer">Mesafeli Satış Sözleşmesi</span>'ni
                      okudum, onaylıyorum.
                    </label>
                  </div>

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Kaydet ve Devam Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage; 