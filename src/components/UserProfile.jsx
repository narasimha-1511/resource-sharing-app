import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import styles from "./profile.module.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    displayName: "",
    location: "",
    bio: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } else {
        setUser(null);
        setProfile({ displayName: "", location: "", bio: "" });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await setDoc(doc(db, "users", user.uid), profile);
      alert("Profile updated successfully!");
    }
  };

  if (!user) return <p>Please sign in to view your profile.</p>;

  return (
    <form onSubmit={handleSubmit} className={styles.profileForm}>
      <input
        type="text"
        name="displayName"
        value={profile.displayName}
        onChange={handleChange}
        placeholder="Display Name"
        className={styles.profileInput}
      />
      <input
        type="text"
        name="location"
        value={profile.location}
        onChange={handleChange}
        placeholder="Location"
        className={styles.profileInput}
      />
      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Bio"
        className={styles.profileTextarea}
      />
      <button type="submit" className={styles.profileButton}>
        Update Profile
      </button>
    </form>
  );
}

export default UserProfile;
