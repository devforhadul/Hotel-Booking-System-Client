import React from "react";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa6";

const TotalServe = () => {
  return (
    <div className="w-11/12 mx-auto py-8 md:py-12 lg:py-16">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    
    {/* Registered Rooms */}
    <div className="flex items-center gap-4 justify-start sm:justify-center bg-Secondary/20 py-5 rounded-md shadow-md hover:shadow-lg transition duration-300">
      <div className="border border-blue-400 p-3 rounded-full">
        <MdOutlineBedroomParent className="text-blue-400" size={35} />
      </div>
      <div>
        <p className="font-semibold text-lg">400</p>
        <h5 className="text-md">Registered Rooms</h5>
      </div>
    </div>

    {/* Guests */}
    <div className="flex items-center gap-4 justify-start sm:justify-center  bg-Secondary/20 py-5 rounded-md shadow-md hover:shadow-lg transition duration-300">
      <div className="border border-blue-400 p-3 rounded-full">
        <FaUserAlt className="text-blue-400" size={35} />
      </div>
      <div>
        <p className="font-semibold text-lg">4430</p>
        <h5 className="text-md">Guests</h5>
      </div>
    </div>

    {/* Tourist Spots */}
    <div className="flex items-center gap-4 justify-start sm:justify-center  bg-Secondary/20 py-5 rounded-md shadow-md hover:shadow-lg transition duration-300">
      <div className="border border-blue-400 p-3 rounded-full">
        <FaLocationArrow className="text-blue-400" size={35} />
      </div>
      <div>
        <p className="font-semibold text-lg">10</p>
        <h5 className="text-md">Tourist Spots</h5>
      </div>
    </div>

    {/* Our Support */}
    <div className="flex items-center gap-4 justify-start sm:justify-center  bg-Secondary/20 py-5  rounded-md shadow-md hover:shadow-lg transition duration-300">
      <div className="border border-blue-400 p-3 rounded-full">
        <IoMdCall className="text-blue-400" size={35} />
      </div>
      <div>
        <p className="font-semibold text-lg">24/7</p>
        <h5 className="text-md">Our Support</h5>
      </div>
    </div>

  </div>
</div>

  );
};

export default TotalServe;
