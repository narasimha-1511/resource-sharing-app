import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import UserDashboard from "./components/UserDashBoard";
import ResourceList from "./components/ResourceList";
import styles from "./App.module.css";
import { Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={styles.app}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/" element={<ResourceList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;