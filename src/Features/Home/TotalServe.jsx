import React from "react";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";

const TotalServe = () => {
  return (
    <div className="py-10 mb-5">
      <div className="flex justify-around items-center w-11/12 mx-auto">
        <div className="flex items-center gap-3">
          <div className="border border-blue-400 p-3 rounded-full">
            <MdOutlineBedroomParent className="text-blue-400" size={35} />
          </div>
          <div>
            <p className="font-semibold text-lg">400</p>
            <h5 className="text-md">Registerd Rooms</h5>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-blue-400 p-3 rounded-full">
            <FaUserAlt className="text-blue-400" size={35} />
          </div>
          <div>
            <p className="font-semibold text-lg">4430</p>
            <h5 className="text-md">Guests</h5>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-blue-400 p-3 rounded-full">
            <FaLocationArrow className="text-blue-400" size={35} />
          </div>

          <div>
            <p className="font-semibold text-lg">10</p>
            <h5 className="text-md">Tourist Spots</h5>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="border border-blue-400 p-3 rounded-full">
            <IoMdCall className="text-blue-400" size={35} />
          </div>

          <div>
            <p className="font-semibold text-lg">24/7</p>
            <h5 className="text-md">Out Support</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalServe;
