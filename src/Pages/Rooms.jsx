import React from "react";
import RoomCard from "../Components/RoomCard";
import { useLoaderData } from "react-router";

const Rooms = () => {
  const rooms = useLoaderData();
  
  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        {rooms.map((room) => (
          <RoomCard room={room}></RoomCard>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
