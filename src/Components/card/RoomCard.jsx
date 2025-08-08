import { CircleCheckBig, CircleSlash2, MapPin, Star } from "lucide-react";
import React from "react";
import { FaUsers, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  return (
    <Link to={`/rooms/${room?._id}`}>
      <div className="rounded-md overflow-hidden shadow-md bg-Secondary/20">
        {/* Image */}
        <div className="p-4">
          <img
            src={room?.images[0]} // Replace with your own image
            alt="Room"
            className="w-full h-60 object-cover rounded-md"
          />
        </div>
        {/* Rooma details */}
        <div className="px-4 pb-4">
          <div className="flex justify-between items-center">
            {/* room avilable badge */}
            <div>
              {room?.isAvailable ? (
                <div className="flex items-center gap-1 text-green-500 mb-2">
                  <CircleCheckBig size={15} />
                  <span>Available</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-red-500 mb-2">
                  <CircleSlash2 size={15} />
                  <span>Unavailable</span>
                </div>
              )}
            </div>
            <span>
              <Star size={15} className="" />
            </span>
          </div>

          <h2 className="text-xl font-bold text-Text">{room?.name}</h2>
          <div className="flex justify-between items-center py-3">
            <p className="text-md text-Text flex items-center ">
              <MapPin className="text-Primary" size={20} />
              <span> {room?.location}</span>
            </p>
            <p className="font-semibold">${room?.pricePerNight}</p>
          </div>

          {/* <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-700 border-t border-b py-3">
            <div>
              <FaUsers className="mx-auto mb-1" size={20} />
              <p>Person</p>
              <p className="font-semibold">{room?.roomCapacity}</p>
            </div>
            <div>
              <Star className="mx-auto mb-1" size={20} />
              <p>Hotel Type</p>
              <p className="font-semibold">{room?.hotelType}</p>
            </div>
            <div>
              <FaMoneyBillWave className="mx-auto mb-1" size={20} />
              <p>PRICE</p>
              <p className="font-semibold">${room?.pricePerNight}</p>
            </div>
          </div> */}

          <button className="w-full mt-3 font-semibold bg-Primary text-white py-2 rounded hover:bg-Primary/90 transition cursor-pointer">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
