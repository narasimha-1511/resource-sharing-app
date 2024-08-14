import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import styles from './UserProfile.module.css';

function UserProfile() {
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setProfile(userSnap.data());
      }
    }
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), profile);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <input
            type="text"
            name="displayName"
            value={profile.displayName}
            onChange={handleInputChange}
            placeholder="Display Name"
            className={styles.profileInput}
          />
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className={styles.profileTextarea}
          />
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleInputChange}
            placeholder="Location"
            className={styles.profileInput}
          />
          <button type="submit" className={styles.profileButton}>Save Profile</button>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <p><strong>Name:</strong> {profile.displayName}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <button onClick={() => setIsEditing(true)} className={styles.profileButton}>Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;