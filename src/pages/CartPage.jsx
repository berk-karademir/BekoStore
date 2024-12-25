import React from "react";
import { Trash2, Plus, Minus, ShoppingCartIcon } from "lucide-react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  removeFromCart,
  updateQuantity,
} from "../store/actions/shoppingCartActions";
import Header from "@/layout/Header";
import { Button } from "@/components/ui/button";

function CartPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.client.user);
  const cartItems = useSelector((state) => state.shoppingCart.items);

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    const storedUser = localStorage.getItem("user");
    const hasUser = user && Object.keys(user).length > 0;
    const hasStoredUser = storedUser && storedUser !== "undefined";

    if (hasUser || hasStoredUser) {
      history.push("/checkout");
    } else {
      toast.warning("Lütfen önce giriş yapın");
      history.push("/login");
    }
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success("Ürün sepetten kaldırıldı");
  };

  const handleUpdateQuantity = (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (currentQuantity === 1 && change === -1) {
      handleRemoveFromCart(productId);
      return;
    }
    if (newQuantity < 1) return;

    dispatch(updateQuantity(productId, newQuantity));
  };

  if (cartItems.length === 0) {
    return (
      <section>
        <Header />

        <div className="max-w-4xl mx-auto mt-20 ">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Alışveriş Sepeti
          </h2>
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <ShoppingCartIcon className="w-10 h-10 " />
            <p className="text-gray-500 mb-4">
              Sepetinizde ürün bulunmamaktadır.
            </p>
            <Button onClick={() => history.push("/shop")}>
              Alışverişe Devam Et
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Alışveriş Sepeti
        </h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
            >
              <img
                src={item.images?.[0]?.url || "/images/product-1.png"}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-gray-600">{item.price} TL</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity, -1)
                    }
                    className="p-1 rounded-full bg-gray-100 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium">{item.quantity} adet</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity, 1)
                    }
                    className="p-1 rounded-full bg-gray-100 hover:bg-green-500 hover:text-white transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Ara Toplam:</span>
            <span>{calculateTotal()} TL</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">KDV (%18):</span>
            <span>{(parseFloat(calculateTotal()) * 0.18).toFixed(2)} TL</span>
          </div>
          <div className="flex flex-col gap-10 justify-between items-center text-lg font-bold border-t pt-2">
            <span>
              Toplam: {(parseFloat(calculateTotal()) * 1.18).toFixed(2)} TL
            </span>
            <Button onClick={handleCheckout}>Siparişi Tamamla</Button>
          </div>

          <button
            onClick={() => history.push("/shop")}
            className="w-full mt-3 text-blue-500 hover:text-blue-600 font-[500]"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    </section>
  );
}

export default CartPage;
