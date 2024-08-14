import React from "react";
import { BrowserRouter as Router, Route, Link, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UserProfile from "./components/UserProfile";
import UserDashboard from "./components/UserDashBoard";
import ResourceList from "./components/ResourceList";
import styles from "./App.module.css";
import { Routes } from "react-router-dom";
import { useAuth } from './context/AuthContext';
import SignOut from './components/SignOut';

function PrivateRoute({ children }) {
  const { currentUser, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  return currentUser ? children : <Navigate to="/signin" />;
}

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
        <div className={styles.app}>
          <nav className={styles.nav}>
            <Link to="/">Home</Link>
            {!currentUser && (
              <>
                <Link to="/signup">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
              </>
            )}
            {currentUser && (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/dashboard">Dashboard</Link>
                <SignOut />
              </>
            )}
          </nav>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
            <Route path="/" element={<ResourceList />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;