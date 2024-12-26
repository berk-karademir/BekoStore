import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Header from '@/layout/Header';

function OrderSuccessPage() {
  const history = useHistory();
  const location = useLocation();
  const orderId = location.state?.orderId;

  if (!orderId) {
    history.replace('/');
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Siparişiniz Başarıyla Oluşturuldu!
            </h1>
            
            <p className="text-lg text-gray-600 mb-8">
              Sipariş numaranız: <span className="font-semibold">{orderId}</span>
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Siparişiniz için teşekkür ederiz. Siparişinizle ilgili tüm güncellemeleri
                e-posta adresinize göndereceğiz.
              </p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="font-semibold text-gray-900 mb-2">Bundan Sonra Ne Olacak?</h2>
                <ul className="text-left text-gray-600 space-y-2">
                  <li>• Siparişiniz onay sürecine alındı</li>
                  <li>• Ürünler depomuzdan hazırlanacak</li>
                  <li>• Kargoya teslim edilecek</li>
                  <li>• Size kargo takip numarası gönderilecek</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 space-x-4">
              <button
                onClick={() => history.push('/orders')}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Siparişlerimi Görüntüle
              </button>
              
              <button
                onClick={() => history.push('/')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Alışverişe Devam Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderSuccessPage; 