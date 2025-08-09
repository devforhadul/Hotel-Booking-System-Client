import React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

const MapSection = () => {
  let DefaultIcon = L.icon({
    iconUrl,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const locations = [
    { id: 1, name: "Dhaka", lat: 23.8103, lng: 90.4125 },
    { id: 2, name: "Chittagong", lat: 22.3569, lng: 91.7832 },
    { id: 3, name: "Sylhet", lat: 24.8949, lng: 91.8687 },
  ];

  return (
    <div className="">
      <div className="w-11/12 mx-auto pt-8 md:pt-12 lg:pt-16">
        <div>
          <h1 className="text-2xl text-center text-Text dark:text-white font-semibold mb-6">Hotel Map</h1>
        </div>
        <div className="">
          <MapContainer
            center={[23.8103, 90.4125]}
            zoom={7}
            style={{ height: "500px", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl={false}
            className=""
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
