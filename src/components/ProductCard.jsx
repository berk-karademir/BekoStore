import React from "react";

function ProductCard() {
  return (
    <section className="bg-[#ECECEC] flex  my-10 mx-10 rounded-lg">
      <div className="pl-10 gap-5 flex items-center overflow-hidden  ">
        <div>
          <p className="text-[737373]">Your Space</p>
          <h3 className="text-[#252B42]">Unique Life</h3>
          <p className="text-sm text-[#252B42]">Explore Items</p>
        </div>
        <img
          src="/images/product-1.png"
          alt="product"
          className="max-w-40"
        />
      </div>
    </section>
  );
}

export default ProductCard;
