import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";
import ResourceList from "./components/ResourceList";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/resources">Resources</Link>
        </nav>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/resources" component={ResourceList} />
          <Route exact path="/" component={ResourceList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
