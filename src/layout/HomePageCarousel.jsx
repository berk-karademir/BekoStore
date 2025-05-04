import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useHistory } from "react-router-dom";
import { fetchMostPopularProducts } from "@/services/authService";
import { fetchCategories } from "@/services/fetchCategories";

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

function HomePageCarousel() {
  const [categories, setCategories] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const loadPopularProducts = async () => {
      const products = await fetchMostPopularProducts();
      setPopularProducts(products);
    };
    loadPopularProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  const handleProductClick = (product) => {
    const categoryId = product.category_id;
    const categoryName = categories.find((cat) => cat.id === categoryId)?.title || "unknown";
    const gender = product.category_id < 9 ? "kadin" : "erkek";
    history.push(`/shop/${gender}/${createSlug(categoryName)}/${categoryId}/${createSlug(product.name)}/${product.id}`);
  };

  const groupedProducts = [];
  for (let i = 0; i < popularProducts.length; i += 4) {
    groupedProducts.push(popularProducts.slice(i, i + 4));
  }

  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center py-20" >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Most Liked Products
      </h2>
      <Carousel className="max-w-[90%]">
        <CarouselContent>
          {groupedProducts.map((group, index) => (
            <CarouselItem key={index}>
              <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {group.map((product) => (
                  <div
                    key={product.id}
                    className="h-full flex flex-col shadow-lg rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between items-stretch h-full">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {product.name} ({product.rating}⭐)
                      </h3>
                      <p className="text-sm text-left text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      <Button className="w-full">Shop Now</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1 top-1/2 transform -translate-y-1/2 hover:scale-[1.1] transition-transform duration-50" />
        <CarouselNext className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:scale-[1.1] transition-transform duration-50" />
      </Carousel>
    </div>
  );
}

export default HomePageCarousel;