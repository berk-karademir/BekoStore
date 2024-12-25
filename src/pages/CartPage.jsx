import React from 'react';
import { Trash2 } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function CartPage() {
  const { cartItems, removeFromCart, calculateTotal } = useCart();
  const history = useHistory();
  const user = useSelector((state) => state.client.user);

  const handleCheckout = () => {
    // Redux store ve localStorage'dan kullanıcı durumunu kontrol et
    const storedUser = localStorage.getItem('user');
    const hasUser = user && Object.keys(user).length > 0;
    const hasStoredUser = storedUser && storedUser !== 'undefined';

    if (hasUser || hasStoredUser) {
      history.push('/checkout');
    } else {
      toast.warning('Lütfen önce giriş yapın');
      history.push('/login');
    }
  };

  const handlePurchase = () => {
    if (!user) {
      history.push('/login');
      return;
    }
    // Satın alma işlemine devam et
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-8">Alışveriş Sepeti</h2>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Sepetinizde ürün bulunmamaktadır.</p>
          <button 
            onClick={() => history.push('/shop')}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-8">Alışveriş Sepeti</h2>
        
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
              <img 
                src={item.images?.[0]?.url || "/images/product-1.png"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">{item.price} TL</p>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Ara Toplam:</span>
            <span>{calculateTotal()} TL</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">KDV (%18):</span>
            <span>{(calculateTotal() * 0.18).toFixed(2)} TL</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
            <span>Toplam:</span>
            <span>{(calculateTotal() * 1.18).toFixed(2)} TL</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
          >
            Siparişi Tamamla
          </button>
          
          <button 
            onClick={() => history.push('/shop')}
            className="w-full mt-3 text-blue-500 hover:text-blue-600"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    </>
  );
}

export default CartPage; 