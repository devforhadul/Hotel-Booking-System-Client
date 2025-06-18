import React from "react";
import RoomCard from "../Components/RoomCard";
import { useLoaderData } from "react-router";
import { Helmet } from "react-helmet";

const Rooms = () => {
  const rooms = useLoaderData();

  return (
    <div className="bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Rooms</title>
        <link rel="canonical" href="http://localhost:5173/rooms" />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 w-11/12 mx-auto">
        {rooms.map(
          (room, idx) =>
            room.isAvailable && <RoomCard key={idx} room={room}></RoomCard>
        )}
      </div>
    </div>
  );
};

export default Rooms;
