import React from "react";

function ShopCards() {
  return (
    <section className="p-10 bg-[#FAFAFA]">
      <div className="overflow-hidden flex flex-col gap-6 my-20"> 
        <div className="bg-[#ECECEC] flex justify-center rounded-lg "> 
          <span className="flex flex-col justify-center items-center">
            <p className="text-[737373]">Your Space</p>
            <h3 className="text-[#252B42]">Unique Life</h3>
            <p className="text-sm text-[#252B42]">Explore Items</p>
          </span>
          <img
            src="/images/product-1.png"
            alt="product"
            className="max-w-[50%]"
          />
        </div>

        <div className="bg-[#ECECEC] flex justify-center p-4 rounded-lg "> 
          <span className="flex flex-col justify-center items-center">
            <p className="text-[737373]">Your Space</p>
            <h3 className="text-[#252B42]">Unique Life</h3>
            <p className="text-sm text-[#252B42]">Explore Items</p>
          </span>
          <img
            src="/images/product-2.png"
            alt="product"
            className="max-w-[50%]"
          />
        </div>

        <div className="bg-[#ECECEC] flex justify-center p-4 rounded-lg">
          <span className="flex flex-col justify-center items-center">
            <p className="text-[737373]">Your Space</p>
            <h3 className="text-[#252B42]">Unique Life</h3>
            <p className="text-sm text-[#252B42]">Explore Items</p>
          </span>
          <img
            src="/images/product-3.png"
            alt="product"
            className="max-w-[50%]"
          />
        </div>
      </div>
    </section>
  );
}

export default ShopCards;
