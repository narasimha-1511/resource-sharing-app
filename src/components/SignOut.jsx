import React from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <button onClick={handleSignOut} className={styles.authButton}>Sign Out</button>
  );
}

export default SignOut;