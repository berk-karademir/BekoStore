import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer
position="bottom-center"
autoClose={6000}
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
      <Route
        exact
        path="/"
        component={() => (
          <>
            <HomePage />
          </>
        )}
      />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
    </Switch>
    </>

  );
}

export default App;
