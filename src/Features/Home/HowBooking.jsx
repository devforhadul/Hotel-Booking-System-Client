import { Play } from "lucide-react";
import React from "react";

const HowBooking = () => {
  return (
    <div className="bg-gray-100 w-11/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-5 justify-between items-center">
        {/* Card */}
        <div className="flex items-center border p-3">
          <img src="" alt="" />
          <div>
            <p>How to book flight?</p>
            <button className="btn">
              <Play></Play> Watch
            </button>
          </div>
        </div>
        {/* Card */}
        <div className="flex items-center border p-3">
          <img src="" alt="" />
          <div>
            <p>How to book flight?</p>
            <button className="btn">
              <Play></Play> Watch
            </button>
          </div>
        </div>
        {/* Card */}
        <div className="flex items-center border p-3">
          <img src="" alt="" />
          <div>
            <p>How to book flight?</p>
            <button className="btn">
              <Play></Play> Watch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowBooking;
