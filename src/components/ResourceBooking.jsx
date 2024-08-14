import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import styles from './ResourceBooking.module.css';

function ResourceBooking({ resource, onBookingComplete }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      setError('Please sign in to book a resource');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Check if the resource is available for the selected dates
      const bookingsRef = collection(db, 'bookings');
      const q = query(
        bookingsRef,
        where('resourceId', '==', resource.id),
        where('startDate', '<=', endDate),
        where('endDate', '>=', startDate)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('This resource is not available for the selected dates');
        setIsLoading(false);
        return;
      }

      await addDoc(collection(db, 'bookings'), {
        resourceId: resource.id,
        userId: auth.currentUser.uid,
        startDate,
        endDate,
        createdAt: new Date()
      });
      setStartDate('');
      setEndDate('');
      onBookingComplete();
    } catch (error) {
      console.error('Error booking resource: ', error);
      setError('An error occurred while booking the resource. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.bookingForm}>
      <h3>Book {resource.title}</h3>
      <form onSubmit={handleBooking}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className={styles.dateInput}
          disabled={isLoading}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className={styles.dateInput}
          disabled={isLoading}
        />
        <button type="submit" className={styles.bookButton} disabled={isLoading}>
          {isLoading ? 'Booking...' : 'Book Resource'}
        </button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default ResourceBooking;