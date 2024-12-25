import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../services/authService";
import {
  setProductList,
  setFetchState,
  setLimit,
  setOffset,
  setTotal,
} from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

function ShopCards() {
  const dispatch = useDispatch();
  const { productList, fetchState, limit, offset, total } = useSelector(
    (state) => state.product
  );
  const productsRef = useRef(null);

  useEffect(() => {
    dispatch(setLimit(4));
  }, [dispatch]);

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setFetchState("FETCHING"));
      try {
        const data = await fetchProducts();
        console.log("Fetched Products:", data);
        if (Array.isArray(data)) {
          dispatch(setProductList(data));
          dispatch(setTotal(data.length));
          dispatch(setFetchState("FETCHED"));
        } else {
          dispatch(setFetchState("ERROR"));
        }
      } catch (err) {
        console.error("Error in component:", err);
        dispatch(setFetchState("ERROR"));
      }
    };

    if (fetchState === "NOT_FETCHED") {
      getProducts();
    }
  }, [dispatch, fetchState]);

  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      dispatch(setOffset(offset - limit));
      scrollToProducts();
    }
  };

  const handleNextPage = () => {
    if (offset + limit < total) {
      dispatch(setOffset(offset + limit));
      scrollToProducts();
    }
  };

  const handlePageClick = (page) => {
    dispatch(setOffset((page - 1) * limit));
    scrollToProducts();
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Ürün sepete eklendi!");
  };

  if (fetchState === "FETCHING")
    return <div className="text-center p-4">Loading...</div>;
  if (fetchState === "ERROR")
    return (
      <div className="text-center p-4 text-red-500">Error loading products</div>
    );
  if (!productList.length)
    return <div className="text-center p-4">No products found</div>;

  const currentProducts = productList.slice(offset, offset + limit);
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  const handleFirstPage = () => {
    dispatch(setOffset(0));
    scrollToProducts();
  };

  const handleLastPage = () => {
    const lastPageOffset = (totalPages - 1) * limit;
    dispatch(setOffset(lastPageOffset));
    scrollToProducts();
  };

  return (
    <section className="p-10 bg-[#FAFAFA]">
      <h3 className="text-2xl font-bold text-center mb-6">ALL PRODUCTS</h3>
      <div ref={productsRef} className="space-y-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#ECECEC] flex flex-col justify-between rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col justify-center flex-grow">
              <h3 className="text-[#252B42] text-lg font-bold mt-2">
                {product.name || "Product Name"} ({product.rating}⭐)
              </h3>
              <p className="text-[#252B42] font-semibold mt-2">
                $
                {typeof product.price === "number"
                  ? product.price.toFixed(2)
                  : "0.00"}{" "}
                <i className="text-gray-500 text-sm">
                  ({product.stock} in stock)
                </i>
              </p>
              <p className="text-gray-500 text-sm mt-2 max-w-[400px]">
                {product.description || "No description available"}
              </p>
            </div>
            <div className="flex items-center mt-4">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0].url
                    : "/images/product-1.png"
                }
                alt={product.name || "Product"}
                className=""
                onError={(e) => {
                  e.target.src = "/images/product-1.png";
                  e.target.onerror = null;
                }}
              />
            </div>
            <Button onClick={() => handleAddToCart(product)}>Add to Cart</Button>
          </div>
          
        ))}
        
      </div>

      {/* Refactored Pagination with clickable page numbers */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handleFirstPage}
          disabled={offset === 0}
          className={`px-4 py-2 rounded-full ${
            offset === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          First
        </button>
        <button
          onClick={handlePrevPage}
          disabled={offset === 0}
          className={`px-4 py-2 rounded-full ${
            offset === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          Previous
        </button>
        <p className="text-center leading-4">
          <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </p>
        <button
          onClick={handleNextPage}
          disabled={offset + limit >= total}
          className={`px-4 py-2 rounded-full ${
            offset + limit >= total
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          Next
        </button>
        <button
          onClick={handleLastPage}
          disabled={offset + limit >= total}
          className={`px-4 py-2 rounded-full ${
            offset + limit >= total
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white transition-colors`}
        >
          Last
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          if (pageNumber >= currentPage - 4 && pageNumber <= currentPage + 4) {
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === pageNumber
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

export default ShopCards;
