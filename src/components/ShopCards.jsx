import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import {
  setLimit,
  fetchProductsWithParams,
  setSortOption,
} from "../store/actions/productActions";
import { addToCart } from "../store/actions/shoppingCartActions";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { fetchCategories } from "../services/fetchCategories";

const ITEMS_PER_PAGE = 4;

const SORT_OPTIONS = [
  { value: "price:asc", label: "Price: Ascending" },
  { value: "price:desc", label: "Price: Descending" },
  { value: "rating:asc", label: "Rating: Ascending" },
  { value: "rating:desc", label: "Rating: Descending" },
];

function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ş/g, "s")
    .replace(/ü/g, "u")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

function ShopCards() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { categoryId } = useParams();
  const [categories, setCategories] = useState([]);

  // URL'den mevcut parametreleri al
  const searchParams = new URLSearchParams(location.search);
  const [filter, setFilter] = useState(searchParams.get("filter") || "");

  const { productList, fetchState, limit, offset, total, sortOption } =
    useSelector((state) => state.product);
  const productsRef = useRef(null);
  const dropdownRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  // Sayfa başına gösterilecek ürün sayısını ayarla
  useEffect(() => {
    dispatch(setLimit(ITEMS_PER_PAGE));
  }, [dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  // URL parametreleri değiştiğinde ürünleri getir
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {
      offset: searchParams.get("offset") || 0,
      category: categoryId,
      sort: searchParams.get("sort"),
      filter: searchParams.get("filter") || "",
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

    // Sort seçeneğini Redux store'a kaydet
    dispatch(setSortOption(option));

    // API'ye istek at
    dispatch(
      fetchProductsWithParams({
        offset: searchParams.get("offset") || 0,
        category: categoryId,
        sort: option,
        filter: searchParams.get("filter") || "",
      })
    );

    // URL'yi güncelle
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = filter.trim();
    const searchParams = new URLSearchParams(location.search);

    // API'ye istek at
    dispatch(
      fetchProductsWithParams({
        offset: 0,
        category: categoryId,
        sort: searchParams.get("sort"),
        filter: searchValue,
      })
    );

    // URL'yi güncelle
    if (searchValue) {
      searchParams.set("filter", searchValue);
    } else {
      searchParams.delete("filter");
    }
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handlePageChange = (newOffset) => {
    const searchParams = new URLSearchParams(location.search);

    // API'ye istek at
    dispatch(
      fetchProductsWithParams({
        offset: newOffset,
        category: categoryId,
        sort: searchParams.get("sort"),
        filter: searchParams.get("filter") || "",
      })
    );

    // URL'yi güncelle
    searchParams.set("offset", newOffset);
    history.push({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success(`${product.name} sepete eklendi!`);
  };
  //URL should be like: shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
  const handleProductClick = (product) => {
    const categoryId = product.category_id;
    const categoryName = categories.find((cat) => cat.id === categoryId).title;
    const gender = product.category_id < 9 ? "kadin" : "erkek";
    history.push(
      `/shop/${gender}/${createSlug(categoryName)}/${categoryId}/${createSlug(
        product.name
      )}/${product.id}`
    );
  };

  // Yükleme ve hata durumları
  if (fetchState === "loading") {
    return <div className="text-center p-4">Ürünler yükleniyor...</div>;
  }

  if (fetchState === "error") {
    return (
      <div className="text-center p-4 text-red-500">
        Ürünler yüklenirken bir hata oluştu!
      </div>
    );
  }

  if (!productList || !productList.length) {
    return <div className="text-center p-4">Ürün bulunamadı.</div>;
  }

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  // Dropdown menü başlığı
  const getDropdownTitle = () => {
    const selectedOption = SORT_OPTIONS.find((opt) => opt.value === sortOption);
    return selectedOption ? selectedOption.label : "Sort by...";
  };

  const groupedCategories = {
    erkek: categories.filter((cat) => cat.gender === "e"),
    kadin: categories.filter((cat) => cat.gender === "k"),
  };
  // Sayfalama butonlarını render et
  const renderPaginationButtons = () => {
    return (
      <div className="flex justify-center gap-2 mt-8">
        <Button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 1}
          variant="outline"
        >
          İlk
        </Button>
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
        <Button
          onClick={() => handlePageChange((totalPages - 1) * limit)}
          disabled={currentPage >= totalPages}
          variant="outline"
        >
          Son
        </Button>
      </div>
    );
  };

  return (
    <section className="p-10 bg-[#FAFAFA]">
      {/* Header ve Filtreler */}
      <div className="flex flex-col justify-between items-center">
        <h3 className="text-2xl font-bold mt-4">All Products</h3>

        <div className="flex flex-col md:flex-row w-full max-w-4xl gap-4 items-center my-10">
          {/* Arama Formu */}
          <div className="w-full">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Ürün ara..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Ara
              </button>
            </form>
          </div>
          {/* Sort Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="text-gray-700">{getDropdownTitle()}</span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSort(option.value)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortOption === option.value
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
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
      <div
        ref={productsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.images?.[0]?.url || "/images/product-1.png"}
              alt={product.name}
              className="rounded-lg mb-4"
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
