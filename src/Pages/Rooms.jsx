import React from "react";
import RoomCard from "../Components/RoomCard";
import { useLoaderData } from "react-router";

const Rooms = () => {
  const rooms = useLoaderData();
  
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 w-11/12 mx-auto">
        {rooms.map((room,idx) => (
          <RoomCard key={idx} room={room}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
