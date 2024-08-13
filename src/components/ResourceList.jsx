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
import ResourceMap from "./ResourceMap";

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    category: "",
    latitude: "",
    longitude: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [viewMode, setViewMode] = useState("list");

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
        latitude: parseFloat(newResource.latitude),
        longitude: parseFloat(newResource.longitude),
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setNewResource({
        title: "",
        description: "",
        category: "",
        latitude: "",
        longitude: "",
      });
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
        <input
          type="number"
          name="latitude"
          value={newResource.latitude}
          onChange={handleInputChange}
          placeholder="Latitude"
          required
          step="any"
          className={styles.resourceInput}
        />
        <input
          type="number"
          name="longitude"
          value={newResource.longitude}
          onChange={handleInputChange}
          placeholder="Longitude"
          required
          step="any"
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
        <button
          onClick={() => setViewMode("list")}
          className={styles.viewButton}
        >
          List View
        </button>
        <button
          onClick={() => setViewMode("map")}
          className={styles.viewButton}
        >
          Map View
        </button>
      </div>
      {viewMode === "list" ? (
        <ul className={styles.resourceList}>
          {filteredResources.map((resource) => (
            <li key={resource.id} className={styles.resourceItem}>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span>Category: {resource.category}</span>
              <p>Location: {resource.latitude}, {resource.longitude}</p>
            </li>
          ))}
        </ul>
      ) : (
        <ResourceMap resources={filteredResources} />
      )}
    </div>
  );
}

export default ResourceList;