import React, { useEffect } from "react";
import PrimaryButton from "../components/PrimaryButton";

function Carousel() {
  useEffect(() => {

    const slider = document.getElementById("slider");
    const next = document.getElementById("next");
    const prev = document.getElementById("prev");

    let currentIndex = 0;
    const slides = slider.children.length;

    next.addEventListener("click", () => {
      if (currentIndex < slides - 1) currentIndex++;
      else currentIndex = 0;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    prev.addEventListener("click", () => {
      if (currentIndex > 0) currentIndex--;
      else currentIndex = slides - 1;
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
  }, []);

  return (
    <section>
      <div className="relative w-full h-screen overflow-hidden">
        <div
          id="slider"
          className="flex transition-transform duration-500 h-full "
        >
          <div className="w-screen h-screen flex flex-col items-center justify-center flex-shrink-0 overflow-hidden bg-[url('/images/product-slide-1.jpg')] bg-cover bg-center bg-no-repeat text-white text-center p-8">
            <h2>GROCERIES DELIVERY</h2>
            <h4 className="text-3xl">
              We know how large objects will act, but things on a small scale. 1
            </h4>
            <PrimaryButton>
              <span className="text-xl">Shop Now</span>
              </PrimaryButton>
          </div>

          <div className=" w-full h-screen flex flex-col items-center justify-center flex-shrink-0 overflow-hidden bg-[url('/images/product-slide-2.jpg')] bg-cover bg-center bg-no-repeat text-white text-center p-8">
            <h2>GROCERIES DELIVERY</h2>
            <h4 className="text-3xl">
              We know how large objects will act, but things on a small scale. 2
            </h4>
            <PrimaryButton>
              <span className="text-xl">Shop Now</span>
              </PrimaryButton>
          </div>

          <div className="w-full h-screen flex flex-col items-center justify-center flex-shrink-0 overflow-hidden bg-[url('/images/product-slide-2.jpg')] bg-cover bg-center bg-no-repeat text-white text-center p-8">
            <h2>GROCERIES DELIVERY</h2>
            <h4 className="text-3xl">
              We know how large objects will act, but things on a small scale. 3
            </h4>
            <PrimaryButton>
              <span className="text-xl">Shop Now</span>
              </PrimaryButton>
          </div>

          
        </div>

        <button
          id="prev"
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white px-4 py-2"
        >
          &#10094;
        </button>
        <button
          id="next"
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white px-4 py-2"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
}

export default Carousel;
