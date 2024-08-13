import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/Auth/SignUp";
import SignIn from "./components/Auth/SignIn";
import UserProfile from "./components/Profile/UserProfile";

function App() {
  return (
    <Router>
      <div>
        <nav></nav>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
