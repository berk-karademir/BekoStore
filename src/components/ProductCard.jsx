import React from "react";

function ProductCard() {
  return (
    <section className="bg-[url('/images/product-1.jpg')] bg-cover bg-center bg-no-repeat min-h-72 flex items-center">
      <div className="flex flex-col pl-10 gap-5">
        <p className="text-[737373]">Your Space</p>
        <h3 className="text-[#252B42]">Unique Life</h3>
        <p className="text-sm text-[#252B42]">Explore Items</p>
      </div>
    </section>
  );
}

export default ProductCard;
