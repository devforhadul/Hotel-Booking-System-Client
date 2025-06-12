import React from "react";
import { FaUsers, FaRulerCombined, FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

const RoomCard = ({ room }) => {
  return (
    <Link to={`/rooms/${room?._id}`}>
      <div className="rounded-lg overflow-hidden shadow-md bg-white">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" // Replace with your own image
          alt="Room"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{room?.name}</h2>
          <p className="text-sm text-gray-500 mb-1">Kinsbury Colombo</p>
          <div className="flex items-center text-yellow-500 mb-2 text-sm">
            {"★".repeat(5)}{" "}
            <span className="text-gray-500 ml-2">234 Reviews</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-sm text-gray-700 border-t border-b py-3">
            <div>
              <FaUsers className="mx-auto mb-1" />
              <p>PAX</p>
              <p className="font-semibold">250 - 500</p>
            </div>
            <div>
              <FaRulerCombined className="mx-auto mb-1" />
              <p>AREA</p>
              <p className="font-semibold">1250 sqf</p>
            </div>
            <div>
              <FaMoneyBillWave className="mx-auto mb-1" />
              <p>PRICE</p>
              <p className="font-semibold">LKR 50,000</p>
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
