import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Auth.module.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect or update state after successful sign-in
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} className={styles.authForm}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className={styles.authInput}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className={styles.authInput}
      />
      <button type="submit" className={styles.authButton}>
        Sign In
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}

export default SignIn;
