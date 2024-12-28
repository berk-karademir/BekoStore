import Header from "@/layout/Header";
import Categories from "@/components/Categories";
import ShopCards from "@/components/ShopCards";
import Footer from "@/layout/Footer";

function ShopPage() {
  return (
    <section>
      <Header />
      <Categories />
      <ShopCards />
      <Footer />
    </section>
  );
}

export default ShopPage;
