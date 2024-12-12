import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import SignUp from "./components/SignUp"; 

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <>
            <Header />
            <ProductCard />
          </>
        )}
      />
      <Route path="/signup" component={SignUp} />
    </Switch>
  );
}

export default App;
