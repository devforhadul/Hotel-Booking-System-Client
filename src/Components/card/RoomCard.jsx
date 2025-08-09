import { CircleCheckBig, CircleSlash2, MapPin, Star } from "lucide-react";
import React from "react";
import { FaUsers, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  
  return (
    <Link to={`/rooms/${room?._id}`}>
      <div className="rounded-md overflow-hidden shadow-xl dark:shadow-xl transition-shadow bg-white dark:bg-slate-800/50">
        {/* Image */}
        <div className="p-5">
          <img
            src={room?.images[0]} // Replace with your own image
            alt="Room"
            className="w-full h-60 object-cover rounded-md"
          />
        </div>
        {/* Rooma details */}
        <div className="px-5 pb-5">
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
              {/* <Star size={15} className="" /> */}
            </span>
          </div>

          <h2 className="text-xl font-bold text-Text dark:text-white">{room?.name}</h2>
          <div className="flex justify-between items-center py-3">
            <p className="text-md text-Text flex items-center gap-1">
              <MapPin className="text-Primary" size={20} />
              <span className="dark:text-white"> {room?.location}</span>
            </p>
            <p className="font-semibold text-Text dark:text-white">${room?.pricePerNight}</p>
          </div>

          <button className="w-full mt-3 font-semibold bg-Primary text-white py-2 rounded hover:bg-Primary/90 transition cursor-pointer">
            Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
