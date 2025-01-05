import React, { useEffect, useState } from "react";
import { fetchMostPopularProducts } from "../services/authService";

const MostPopularProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const popularProducts = await fetchMostPopularProducts();
        setProducts(popularProducts);
      } catch (error) {
        console.error("Popüler ürünler yüklenirken hata:", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h2>En Popüler Ürünler</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.images[0].url} alt={product.name} />
            {product.name} - {product.rating}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MostPopularProducts;
