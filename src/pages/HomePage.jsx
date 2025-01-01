import React from "react";
import Header from "../layout/Header.jsx";
import ShopCards from "../components/ShopCards.jsx";
import BestsellerProducts from "../components/BestsellerProducts.jsx";
import MostPopularProducts from "../components/MostPopularProducts.jsx";
import OurClients from "../components/OurClients.jsx";
import Blog from "../components/Blog.jsx";
import Footer from "../layout/Footer.jsx";
import HomePageCarousel from "@/layout/HomePageCarousel.jsx";

function HomePage() {
  return (
    <main >
      <Header/>
      <HomePageCarousel/>
      <ShopCards/>
      <BestsellerProducts/>
      <MostPopularProducts/>
      <OurClients/>
      <Blog/>
      <Footer/>
    </main>
  );
}

export default HomePage;
