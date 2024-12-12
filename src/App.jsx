import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./components/SignUp"; 
import HomePage from "./pages/HomePage";
import LogIn from "./components/LogIn"; 

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
