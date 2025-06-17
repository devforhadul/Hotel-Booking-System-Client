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
    <div className="">
      <div className="w-11/12 mx-auto py-10">
        <div>
          <h1 className="text-2xl font-bold mb-6">Hotel Map</h1>
        </div>
        <MapContainer
          center={centerPosition} // Dhaka coordinates
          zoom={13}
          scrollWheelZoom={false}
          className="h-[400px]  rounded-lg"
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
    </div>
  );
};

export default MapSection;
