import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const MapSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 max-w-screen-xl mx-auto">
      <MapContainer
        center={[23.8103, 90.4125]} // Dhaka coordinates
        zoom={13}
        scrollWheelZoom={false}
        className="h-[400px] w-full max-w-screen-lg mx-auto rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[23.8103, 90.4125]}>
          <Popup>Our Hotel Location in Dhaka!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSection;
