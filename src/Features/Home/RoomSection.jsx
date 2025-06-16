import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaUsers, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";

const RoomSection = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/top-rated")
      .then((response) => {
        console.log(response.data);
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top-rated rooms:", error);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room, idx) => (
          <Link  to={`/rooms/${room?._id}`}>
            <div key={idx} className="rounded-lg overflow-hidden shadow-md bg-white">
              <img
                src={room?.images[0]} // Replace with your own image
                alt="Room"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{room?.name}</h2>
                <p className="text-sm text-gray-500 mb-1">{room?.location}</p>
                <div className="flex items-center text-yellow-500 mb-2 text-sm">
                  {/* {"★".repeat(5)}{" "} */}
                  <span className="text-gray-500">{room?.hotelType} Hotel</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-700 border-t border-b py-3">
                  <div>
                    <FaUsers className="mx-auto mb-1" />
                    <p>PAX</p>
                    <p className="font-semibold">{room?.roomCapacity}</p>
                  </div>
                  <div>
                    <FaRulerCombined className="mx-auto mb-1" />
                    <p>AREA</p>
                    <p className="font-semibold">1250 sqf</p>
                  </div>
                  <div>
                    <FaMoneyBillWave className="mx-auto mb-1" />
                    <p>PRICE</p>
                    <p className="font-semibold">${room?.pricePerNight}</p>
                  </div>
                </div>

                <button className="w-full mt-3 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                  BOOK NOW!
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomSection;
