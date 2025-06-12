import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapSection = () => {
  const locations = [
    { id: 1, name: "Dhaka", position: [23.8103, 90.4125] },
    { id: 2, name: "Chittagong", position: [22.3569, 91.7832] },
    { id: 3, name: "Rajshahi", position: [24.3636, 88.6241] },
    { id: 4, name: "Sylhet", position: [24.8949, 91.8687] },
  ];

  const centerPosition = [23.8103, 90.4125]; // Default map center

  return (
    <div className="w-full mx-auto py-8">
      <div>
        <h3 className="text-center text-2xl font-semibold">Our Hotel map</h3>
      </div>
      <MapContainer
        center={centerPosition} // Dhaka coordinates
        zoom={13}
        scrollWheelZoom={false}
        className="h-[400px] w-full max-w-screen-lg mx-auto rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker key={location.id} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;
