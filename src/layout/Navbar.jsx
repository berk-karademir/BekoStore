import React, { useState } from "react";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import NavBarTitles from "./NavBarTitles";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from '../store/actions/shoppingCartActions';
import { toast } from 'react-toastify';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.client?.user) || null;
  const cartItems = useSelector((state) => state.shoppingCart.items);
  const [showCart, setShowCart] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Ürün sepetten kaldırıldı!');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleUserClick = () => {
    // Check both Redux state and localStorage
    const storedUser = localStorage.getItem('user');
    const hasUser = user && Object.keys(user).length > 0;
    const hasStoredUser = storedUser && storedUser !== 'undefined';

    

    if (hasUser || hasStoredUser) {
      console.log("User is logged in, navigating to profile");
      history.push("/profile");
    } else {
      console.log("No user found, navigating to signup");
      history.push("/signup");
    }
  };

  return (
    <nav>
      <div className={`flex items-center justify-evenly pt-10 ${isMenuOpen ? '' : 'pb-4'}`} >
        <h3 onClick={() => history.push("/")}>BekoStore</h3>
        
        <ul className="flex gap-3">
          <li>
            <User onClick={handleUserClick} style={{ cursor: "pointer" }} />
          </li>
          <li>
            <Search />
          </li>
          <li>
            <div className="relative">
              <button 
                className="flex items-center hover:text-gray-600"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {showCart && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 z-50">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500 text-center">Sepetiniz boş</p>
                  ) : (
                    <>
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-3 mb-3 pb-3 border-b">
                          <img 
                            src={item.images?.[0]?.url || "/images/product-1.png"} 
                            alt={item.name} 
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h6 className="text-sm font-medium">{item.name}</h6>
                            <p className="text-sm text-gray-600">{item.price} TL</p>
                          </div>
                          <button 
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <div className="border-t pt-3 mt-3">
                        <p className="font-medium">Toplam: {calculateTotal()} TL</p>
                        <button 
                          onClick={() => history.push('/cart')} 
                          className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                          Sepete Git
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </li>
          <li>
            <Menu onClick={toggleMenu} />
          </li>
        </ul>
      </div>
      {isMenuOpen && <NavBarTitles />}
    </nav>
  );
}

export default Navbar;
