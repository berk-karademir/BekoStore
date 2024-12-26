import React from 'react';
import { Loader } from 'lucide-react';

function OrderSummary({ 
  cartItems, 
  calculateTotal, 
  handleSubmit, 
  isLoading 
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {cartItems && cartItems.length > 0 ? (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Shipping</span>
                <span>$29.99</span>
              </div>
              <div className="flex justify-between mt-4 font-bold text-lg">
                <span>Total</span>
                <span>${(calculateTotal() + 29.99).toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading.payment || !cartItems || cartItems.length === 0}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
            isLoading.payment || !cartItems || cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading.payment ? (
            <div className="flex items-center justify-center">
              <Loader className="animate-spin mr-2" size={20} />
              Processing...
            </div>
          ) : (
            'Complete Payment'
          )}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary; 