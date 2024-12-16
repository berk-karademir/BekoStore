import React from "react";

function ProductCardWithInfo({ children }) {
  return (
    <main className="my-10 ">
      <div className="text-center flex flex-col justify-center items-center mb-20 gap-2">
        <img
          src="/images/product-1.png"
          alt="Organic Ice Cream"
          className="max-w-[90%]"
        />

        <h4>Organic Caramel Ice Cream</h4>
        <h5 className="text-[#737373]">
          100% organic diary milk products made with love
        </h5>
        <h5>{children}</h5>

        <h5>
          <span className="text-[#BDBDBD]">$29.90</span>{" "}
          <span className="text-[#23856D]">$14.90</span>
        </h5>
      </div>

      <div className="text-center flex flex-col justify-center items-center mb-20 gap-2">
        <img
          src="/images/product-2.png"
          alt="Organic Ice Cream"
          className="max-w-[90%]"
        />

        <h4>Organic Fresh Fruits</h4>
        <h5 className="text-[#737373]">
          From gardens to your table.
        </h5>
        <h5>{children}</h5>

        <h5>
          <span className="text-[#BDBDBD]">$16.90</span>{" "}
          <span className="text-[#23856D]">$9.90</span>
        </h5>
      </div>

      <div className="text-center flex flex-col justify-center items-center mb-20 gap-2">
        <img
          src="/images/product-3.png"
          alt="Organic Ice Cream"
          className="max-w-[90%]"
        />

        <h4>Uncure Organic Canadidan Ham</h4>
        <h5 className="text-[#737373]">
          100% organic, 0 preservatives!
        </h5>
        <h5>{children}</h5>

        <h5>
          <span className="text-[#BDBDBD]">$79.90</span>{" "}
          <span className="text-[#23856D]">$59.90</span>
        </h5>
      </div>


      
    </main>
  );
}

export default ProductCardWithInfo;
