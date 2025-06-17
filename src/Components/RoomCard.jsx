import { Star } from "lucide-react";
import React from "react";
import { FaUsers, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  return (
    <Link to={`/rooms/${room?._id}`}>
      <div className="rounded-lg overflow-hidden shadow-md bg-white">
        <img
          src={room?.images[0]} // Replace with your own image
          alt="Room"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{room?.name}</h2>
          <p className="text-sm text-gray-500 mb-3">{room?.location}</p>
          
          <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-700 border-t border-b py-3">
            <div>
              <FaUsers className="mx-auto mb-1" size={20}/>
              <p>Person</p>
              <p className="font-semibold">{room?.roomCapacity}</p>
            </div>
            <div>
              <Star className="mx-auto mb-1" size={20} />
              <p>Hotel Type</p>
              <p className="font-semibold">{room?.hotelType}</p>
            </div>
            <div>
              <FaMoneyBillWave className="mx-auto mb-1" size={20}/>
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
  );
};

export default RoomCard;
