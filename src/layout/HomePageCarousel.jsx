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
    history.push(
      `/shop/${gender}/${createSlug(categoryName)}/${categoryId}/${createSlug(
        product.name
      )}/${product.id}`
    );
  };

  // Ürünleri 2'li gruplara böl
  const groupedProducts = [];
  for (let i = 0; i < popularProducts.length; i += 2) {
    groupedProducts.push(popularProducts.slice(i, i + 2));
  }

  return (
    <Carousel>
      <CarouselContent>
        {groupedProducts.map((group, index) => (
          <CarouselItem key={index}>
            <h3 className="text-center mb-10 mt-20">Most Liked Products</h3>
            <div className="grid grid-cols-2 gap-4">
              
              {group.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className=""
                  />
                  <h3 className="mt-4">
                    {product.name} ({product.rating}⭐)
                  </h3>
                  <p className="max-w-[80%] text-center">{product.description}</p>
                  <Button className="mt-2">Shop Now</Button>
                </div>
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
    </Carousel>
  );
}

export default HomePageCarousel;
