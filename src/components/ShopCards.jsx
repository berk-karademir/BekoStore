import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { fetchProducts } from "../services/authService";
import {
  setLimit,
  fetchProductsWithParams,
  sortProducts,
  handlePagination
} from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 4;

const SORT_OPTIONS = [
  { value: "price:asc", label: "Price: Ascending" },
  { value: "price:desc", label: "Price: Descending" },
  { value: "rating:asc", label: "Rating: Ascending" },
  { value: "rating:desc", label: "Rating: Descending" }
];

function ShopCards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { categoryId } = useParams();
  
  // URL'den mevcut parametreleri al
  const searchParams = new URLSearchParams(location.search);
  const [filterText, setFilterText] = useState(searchParams.get("filter") || "");
  
  const { productList, fetchState, limit, offset, total, sortOption } = useSelector(
    (state) => state.product
  );
  const productsRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Sayfa başına gösterilecek ürün sayısını ayarla
  useEffect(() => {
    dispatch(setLimit(ITEMS_PER_PAGE));
  }, [dispatch]);

  // URL parametreleri değiştiğinde ürünleri getir
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      offset: searchParams.get("offset") || 0,
      category: categoryId,
      sort: searchParams.get("sort"),
      filter: searchParams.get("filter")
    };
    dispatch(fetchProductsWithParams(params));
  }, [dispatch, categoryId, location.search]);

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Yardımcı fonksiyonlar
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Event handler'lar
  const handleSort = (option) => {
    setIsDropdownOpen(false);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", option);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    });
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterText(value);
    const searchParams = new URLSearchParams(location.search);
    if (value) {
      searchParams.set("filter", value);
    } else {
      searchParams.delete("filter");
    }
    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    });
  };

  const handlePageChange = (newOffset) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("offset", newOffset);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString()
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} sepete eklendi!`);
  };

  const handleProductClick = (product, gender, categoryName, categoryId) => {
    const productNameSlug = product.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    //`/shop/${gender || 'erkek'}/${categoryName || 'category'}/${categoryId || '0'}/${slug}/${product.id}`
    history.push(`/shop/${gender}/${categoryName}/${categoryId}/${productNameSlug}/${product.id}`);
  };

  // Yükleme ve hata durumları
  if (fetchState === "loading") {
    return <div className="text-center p-4">Ürünler yükleniyor...</div>;
  }

  if (fetchState === "error") {
    return <div className="text-center p-4 text-red-500">Ürünler yüklenirken bir hata oluştu!</div>;
  }

  if (!productList || !productList.length) {
    return <div className="text-center p-4">Ürün bulunamadı.</div>;
  }

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  // Dropdown menü başlığı
  const getDropdownTitle = () => {
    if (sortOption === "none") return "Sort by...";
    const selectedOption = SORT_OPTIONS.find(opt => opt.value === sortOption);
    return selectedOption?.label || "Sort by...";
  };

  // Sayfalama butonlarını render et
  const renderPaginationButtons = () => {
    return (
      <div className="flex justify-center gap-2 mt-8">
        <Button
          onClick={() => handlePageChange(offset - limit)}
          disabled={currentPage === 1}
          variant="outline"
        >
          Önceki
        </Button>
        <span className="flex items-center px-4 py-2 bg-gray-100 rounded">
          {currentPage} / {totalPages}
        </span>
        <Button
          onClick={() => handlePageChange(offset + limit)}
          disabled={currentPage >= totalPages}
          variant="outline"
        >
          Sonraki
        </Button>
      </div>
    );
  };

  return (
    <section className="p-10 bg-[#FAFAFA]">
      {/* Header ve Filtreler */}
      <div className="flex flex-col justify-between items-center">
        <h3 className="text-2xl font-bold mt-4">ALL PRODUCTS</h3>
        
        <div className="flex gap-4 items-center my-10">
          {/* Filter Input */}
          <input
            type="text"
            value={filterText}
            onChange={handleFilter}
            placeholder="Ürün ara..."
            className="px-4 py-2 border rounded-lg"
          />
          
          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="text-gray-700">{getDropdownTitle()}</span>
              <svg
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSort(option.value)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortOption === option.value ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ürün Grid'i */}
      <div ref={productsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.images?.[0]?.url || "/images/product-1.png"}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = "/images/product-1.png";
                e.target.onerror = null;
              }}
            />
            <h3 className="text-lg font-semibold mb-2">
              {product.name} ({product.rating}⭐)
            </h3>
            <p className="text-gray-600 mb-2">
              ${product.price.toFixed(2)}
              <span className="text-sm ml-2">({product.stock} adet)</span>
            </p>
            <p className="text-gray-500 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }} 
              className="w-full"
            >
              Sepete Ekle
            </Button>
          </div>
        ))}
      </div>

      {/* Sayfalama */}
      {renderPaginationButtons()}
    </section>
  );
}

export default ShopCards;
