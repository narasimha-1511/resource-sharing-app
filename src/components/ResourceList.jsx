import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import styles from "./resources.module.css";

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const q = query(collection(db, "resources"));
    const querySnapshot = await getDocs(q);
    const resourceList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setResources(resourceList);
  };

  const handleInputChange = (e) => {
    setNewResource({ ...newResource, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Please sign in to add a resource");
      return;
    }
    try {
      await addDoc(collection(db, "resources"), {
        ...newResource,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewResource({ title: "", description: "", category: "" });
      fetchResources();
    } catch (error) {
      console.error("Error adding resource: ", error);
    }
  };

  return (
    <div className={styles.resourceContainer}>
      <h2>Available Resources</h2>
      <form onSubmit={handleSubmit} className={styles.resourceForm}>
        <input
          type="text"
          name="title"
          value={newResource.title}
          onChange={handleInputChange}
          placeholder="Resource Title"
          required
          className={styles.resourceInput}
        />
        <textarea
          name="description"
          value={newResource.description}
          onChange={handleInputChange}
          placeholder="Resource Description"
          required
          className={styles.resourceTextarea}
        />
        <input
          type="text"
          name="category"
          value={newResource.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
          className={styles.resourceInput}
        />
        <button type="submit" className={styles.resourceButton}>
          Add Resource
        </button>
      </form>
      <ul className={styles.resourceList}>
        {resources.map((resource) => (
          <li key={resource.id} className={styles.resourceItem}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <span>Category: {resource.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResourceList;
