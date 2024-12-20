import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../services/authService";
import { setProductList, setFetchState, setLimit, setOffset, setTotal } from '../store/actions/productActions';

function ShopCards() {
  const dispatch = useDispatch();
  const { productList, fetchState, limit, offset, total } = useSelector(state => state.product);

  useEffect(() => {
    // Set initial limit to 4 items per page
    dispatch(setLimit(4));
  }, [dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setFetchState('FETCHING'));
      try {
        const data = await fetchProducts();
        console.log('Fetched Products:', data);
        if (Array.isArray(data)) {
          dispatch(setProductList(data));
          dispatch(setTotal(data.length));
          dispatch(setFetchState('FETCHED'));
        } else {
          dispatch(setFetchState('ERROR'));
        }
      } catch (err) {
        console.error('Error in component:', err);
        dispatch(setFetchState('ERROR'));
      }
    };

    if (fetchState === 'NOT_FETCHED') {
      getProducts();
    }
  }, [dispatch, fetchState]);

  const handlePrevPage = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - limit));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (offset + limit < total) {
      dispatch(setOffset(offset + limit));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (fetchState === 'FETCHING') return <div className="text-center p-4">Loading...</div>;
  if (fetchState === 'ERROR') return <div className="text-center p-4 text-red-500">Error loading products</div>;
  if (!productList.length) return <div className="text-center p-4">No products found</div>;

  // Get current page items
  const currentProducts = productList.slice(offset, offset + limit);
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <section className="p-10 bg-[#FAFAFA]">
      <div className="space-y-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-[#ECECEC] flex flex-col justify-between rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col justify-center flex-grow">
              <p className="text-[#737373] text-sm">{product.category || 'Uncategorized'}</p>
              <h3 className="text-[#252B42] text-xl font-bold mt-2">{product.name || 'Product Name'}</h3>
              <p className="text-[#252B42] font-semibold mt-2">
                ${typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'}
              </p>
              <p className="text-gray-500 text-sm mt-2 max-w-[400px]">
                {product.description || 'No description available'}
              </p>
            </div>
            <div className="flex items-center mt-4">
              <img
                src={product.image || '/images/product-1.png'}
                alt={product.name || 'Product'}
                className="w-32 h-32 object-contain"
                onError={(e) => {
                  e.target.src = '/images/product-1.png';
                  e.target.onerror = null;
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={offset === 0}
          className={`px-4 py-2 rounded-full ${
            offset === 0 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          Previous Page
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={offset + limit >= total}
          className={`px-4 py-2 rounded-full ${
            offset + limit >= total 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          Next Page
        </button>
      </div>
    </section>
  );
}

export default ShopCards;
