import React from "react";
import Header from "../layout/Header.jsx";
import ShopCards from "../components/ShopCards.jsx";
import BestsellerProducts from "../components/BestsellerProducts.jsx";
import MostPopularProducts from "../components/MostPopularProducts.jsx";

function HomePage() {
  return (
    <main>
      <Header/>
      <ShopCards/>
      <BestsellerProducts/>
      <MostPopularProducts/>
    </main>
  );
}

export default HomePage;
