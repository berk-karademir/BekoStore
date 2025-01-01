import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

function HomePageCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        {/* CAROUSEL ITEMLARIN TOP 10 RATINGLI URUNLERDEN OLUŞSUN !!! */}
        <CarouselItem >
          <div className="w-screen h-screen flex flex-col items-center justify-center flex-shrink-0 overflow-hidden bg-[url('/images/product-slide-1.jpg')] bg-cover bg-center bg-no-repeat text-white text-center p-8">
            <h2>GROCERIES DELIVERY</h2>
            <h4 className="text-3xl">
              We know how large objects will act, but things on a small scale. 1
            </h4>
            <Button>Shop Now</Button>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="w-screen h-screen flex flex-col items-center justify-center flex-shrink-0 overflow-hidden bg-[url('/images/product-slide-1.jpg')] bg-cover bg-center bg-no-repeat text-white text-center p-8">
            <h2>GROCERIES DELIVERY</h2>
            <h4 className="text-3xl">
              We know how large objects will act, but things on a small scale. 2
            </h4>
            <Button>Shop Now</Button>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="w-screen h-screen flex flex-col items-center justify-center flex-shrink-0 overflow-hidden bg-[url('/images/product-slide-1.jpg')] bg-cover bg-center bg-no-repeat text-white text-center p-8">
            <h2>GROCERIES DELIVERY</h2>
            <h4 className="text-3xl">
              We know how large objects will act, but things on a small scale. 3
            </h4>
            <Button>Shop Now</Button>
          </div>
        </CarouselItem>

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext ><ChevronRight size={48} strokeWidth={3} /></CarouselNext>
    </Carousel>
  );
}

export default HomePageCarousel;
