import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './ResourceMap.module.css';
import L from 'leaflet';

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ResourceMap({ resources }) {
  const center = [51.505, -0.09]; // Default center (London)

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={center} zoom={13} className={styles.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {resources.map((resource) => (
          <Marker key={resource.id} position={[resource.latitude, resource.longitude]}>
            <Popup>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <p>Category: {resource.category}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ResourceMap;