import React from 'react'
import ProductCardWithInfo from './ProductCardWithInfo'

function MostPopularProducts() {
  return (
    <main className='my-10'>
        <div className='flex flex-col items-center gap-10'>
            <img src="/images/moto-courier.png" alt="Moto Courier"/>
            <h3>MOST POPULAR</h3>
            <p className='indent-5 max-w-[85%] text-justify'>We focus on healthy and sustainable products that are good for you and the planet.</p>
        </div>
        <div className="text-center flex flex-col justify-center items-center mb-20 gap-2 mt-16">
        <img
          src="/images/top-product-1.png"
          alt="Organic Ice Cream"
          className="max-w-[90%]"
        />

        <h4>Organic Veal Cubes</h4>
        <h5 className="text-[#737373]">
          100% organic, 0 preservatives!
        </h5>
        <h5>5000+ Sales</h5>

        <h5>
          <span className="text-[#BDBDBD]">$79.90</span>{" "}
          <span className="text-[#23856D]">$59.90</span>
        </h5>
      </div>
        <ProductCardWithInfo>1000+ Sales</ProductCardWithInfo>
       
        <div class="flex justify-center pt-10">
    <div class="space-y-6 max-w-md">
        <div class="flex space-x-4">
            <span class="text-red-500 text-4xl font-bold w-8 text-right">1.</span>
            <div>
                <h3 class="text-lg font-bold text-gray-900">Easy to use</h3>
                <p class="text-gray-500 text-sm">Things on a very small that you have any direct</p>
            </div>
        </div>
        <div class="flex space-x-4">
            <span class="text-red-500 text-4xl font-bold w-8 text-right">2.</span>
            <div>
                <h3 class="text-lg font-bold text-gray-900">Easy to use</h3>
                <p class="text-gray-500 text-sm">Things on a very small that you have any direct</p>
            </div>
        </div>
        <div class="flex space-x-4">
            <span class="text-red-500 text-4xl font-bold w-8 text-right">3.</span>
            <div>
                <h3 class="text-lg font-bold text-gray-900">Easy to use</h3>
                <p class="text-gray-500 text-sm">Things on a very small that you have any direct</p>
            </div>
        </div>
        <div class="flex space-x-4">
            <span class="text-red-500 text-4xl font-bold w-8 text-right">4.</span>
            <div>
                <h3 class="text-lg font-bold text-gray-900">Easy to use</h3>
                <p class="text-gray-500 text-sm">Things on a very small that you have any direct</p>
            </div>
        </div>
    </div>
</div>
    </main>
  )
}

export default MostPopularProducts
