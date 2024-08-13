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
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const filteredResources = resources.filter((resource) =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === "" || resource.category === filterCategory)
  );

  const categories = [...new Set(resources.map((resource) => resource.category))];

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
      <div className={styles.searchFilter}>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <select
          value={filterCategory}
          onChange={handleFilterChange}
          className={styles.filterSelect}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <ul className={styles.resourceList}>
        {filteredResources.map((resource) => (
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