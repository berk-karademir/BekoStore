import React from "react";
import ProductCardWithInfo from "./ProductCardWithInfo";

function BestsellerProducts() {
  return (
    <main>
      <div className="bg-[url('/images/product-card-1.jpg')] bg-cover bg-center bg-no-repeat min-w-screen min-h-screen">
        <div className="p-6">
          <h5>ORGANIC FOODS</h5>
          <h6 className="text-[#737373]">products.length Items</h6>
        </div>
      </div>

      <div className="border-b-[1px] border-y-gray-[181, 181, 181] pb-8 flex flex-col gap-10 mt-16">
      <h4 className="text-center">BESTSELLER PRODUCTS</h4>

      <span className="flex justify-center gap-8 text-[#737373]">
        <h5 className="text-blue-400">Organic</h5>
        <h5>Vegan</h5>
        <h5>Misc. & Others</h5>
        </span>

        <span className="flex justify-center gap-4 text-[#737373]">
        <button>&#10094;</button>
        <button>&#10095;</button>
        </span>
        
      </div>
     
     <div>
        <ProductCardWithInfo/>
     </div>
    </main>
  );
}

export default BestsellerProducts;
