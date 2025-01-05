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
    const categoryName = categories.find((cat) => cat.id === categoryId).title;
    const gender = product.category_id < 9 ? "kadin" : "erkek";
    history.push(
      `/shop/${gender}/${createSlug(categoryName)}/${categoryId}/${createSlug(
        product.name
      )}/${product.id}`
    );
  };

  return (
    <Carousel>
      <CarouselContent>
        {popularProducts.map((product) => (
          <CarouselItem key={product.id}>
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <h3>Favorite Products</h3>
              <img
                src={product.images[0].url}
                alt={product.name}
                className="w-full h-auto"
              />
              <h3 className="mt-4">
                {product.name} ({product.rating}⭐)
              </h3>
              <p className="max-w-[80%] text-center">{product.description}</p>
              <Button className="mt-2">Shop Now</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"></CarouselPrevious>
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"></CarouselNext>
    </Carousel>
  );
}

export default HomePageCarousel;
