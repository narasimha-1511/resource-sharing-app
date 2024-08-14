import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from './UserDashboard.module.css';

function UserDashboard() {
  const [userBookings, setUserBookings] = useState([]);
  const [userResources, setUserResources] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserBookings();
      fetchUserResources();
    }
  }, []);

  const fetchUserBookings = async () => {
    const q = query(collection(db, 'bookings'), where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUserBookings(bookings);
  };

  const fetchUserResources = async () => {
    const q = query(collection(db, 'resources'), where('userId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const resources = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUserResources(resources);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>User Dashboard</h2>
      <div className={styles.section}>
        <h3>Your Bookings</h3>
        <ul className={styles.list}>
          {userBookings.map(booking => (
            <li key={booking.id} className={styles.listItem}>
              <p>Resource ID: {booking.resourceId}</p>
              <p>Start Date: {booking.startDate}</p>
              <p>End Date: {booking.endDate}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h3>Your Shared Resources</h3>
        <ul className={styles.list}>
          {userResources.map(resource => (
            <li key={resource.id} className={styles.listItem}>
              <h4>{resource.title}</h4>
              <p>{resource.description}</p>
              <p>Category: {resource.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;