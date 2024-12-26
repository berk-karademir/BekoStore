import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OurTeam from "./pages/OurTeam";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { verifyToken } from './services/authService';
import { setUser } from './store/actions/userActions';
import { useDispatch } from 'react-redux';
import axiosInstance from './services/axiosInstance';
import OrderSuccessPage from './pages/OrderSuccessPage';
import OrderHistory from "./pages/OrderHistory";
import ProductDetail from "./components/ProductDetail";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = token;
      
      verifyToken()
        .then(user => {
          dispatch(setUser(user));
        })
        .catch(() => {
          // Token geçersiz ise temizleme işlemleri
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
          delete axiosInstance.defaults.headers.common['Authorization'];
        });
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{fontWeight:"600"}}
      /> 

      <Switch>

      <Route path="/shop/:gender/:categoryName/:categoryId">
          <ShopPage />
        </Route> 

        <Route path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId">
          <ProductDetail />
        </Route>
        
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/about" component={AboutUs} />
        <Route path="/team" component={OurTeam} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LogIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/order-success" component={OrderSuccessPage} />
        <Route path="/orders" component={OrderHistory} />
      </Switch>
    </>
  );
}

export default App;
