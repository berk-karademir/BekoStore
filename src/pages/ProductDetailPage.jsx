import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { currentProduct, productDetailLoading, productDetailError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetail(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (currentProduct) {
      dispatch(addToCart(currentProduct));
      toast.success(`${currentProduct.name} sepete eklendi!`);
    }
  };

  if (productDetailLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500">Product is loading...</div>
      </div>
    );
  }

  if (productDetailError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Ürün yüklenirken bir hata oluştu!</div>
      </div>
    );
  }

  if (!currentProduct) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => history.goBack()}
        className="mb-8 flex items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          className="w-6 h-6 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Geri Dön
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={currentProduct.images?.[0]?.url || "/images/product-1.png"}
              alt={currentProduct.name}
              className="w-full h-full object-center object-cover"
              onError={(e) => {
                e.target.src = "/images/product-1.png";
                e.target.onerror = null;
              }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{currentProduct.name}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${currentProduct.price.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500">
              ({currentProduct.stock} adet stokta)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400">⭐</span>
            <span className="text-gray-700">{currentProduct.rating}</span>
            <span className="text-gray-500">({currentProduct.sell_count} satış)</span>
          </div>
          <p className="text-gray-700">{currentProduct.description}</p>
          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto px-8 py-3"
          >
            Sepete Ekle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 