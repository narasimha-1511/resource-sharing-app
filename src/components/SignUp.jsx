import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styles from "./Auth.module.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        createdAt: new Date()
      });
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSignUp} className={styles.authForm}>
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
        Sign Up
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
  );
}

export default SignUp;