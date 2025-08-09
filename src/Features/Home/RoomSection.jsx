import axios from "axios";
import { CircleCheckBig, CircleSlash2, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaRulerCombined, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

const RoomSection = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get("https://modern-hotel-booking-server-nine.vercel.app/top-rated")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching top-rated rooms:", error);
      });
  }, []);

  return (
    <div className="w-11/12 mx-auto pt-8 md:pt-12 lg:pt-16 ">
       <h1 className="text-2xl text-center text-Text dark:text-white font-semibold mb-6">Top Rated Room</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room, idx) => (
          <Link key={idx} to={`/rooms/${room?._id}`}>
            <div className="rounded-md overflow-hidden shadow-md bg-Secondary/20 dark:bg-slate-800/50">
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

                <h2 className="text-xl font-bold text-Text dark:text-white">{room?.name}</h2>
                <div className="flex justify-between items-center py-3">
                  <p className="text-md text-Text gap-1 dark:text-white flex items-center ">
                    <MapPin className="text-Primary" size={20} />
                    <span> {room?.location}</span>
                  </p>
                  <p className="font-semibold">${room?.pricePerNight}</p>
                </div>

                <button className="w-full mt-3 font-semibold bg-Primary text-white py-2 rounded hover:bg-Primary/90 transition cursor-pointer">
                  View Details
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
