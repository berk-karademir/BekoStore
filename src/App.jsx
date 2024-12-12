import React from "react";
import {Route, Switch } from "react-router-dom";


import HomePage from "./pages/HomePage";
import LogIn from "./components/LogIn"; 
import SignUp from "./components/SignUp"; 
function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => (
          <>
            <HomePage/>
          </>
        )}
      />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
    </Switch>
  );
}

export default App;
