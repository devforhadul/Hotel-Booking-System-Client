import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router";
import { Helmet } from "react-helmet";
import RoomCard from "../Components/card/RoomCard";
import axios from "axios";

const Rooms = () => {
  const rooms = useLoaderData();
  const navigation = useNavigation();



  if (navigation.state == "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }


  return (
    <div className="py-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Rooms</title>
        <link rel="canonical" href="https://modern-hotel-booking-63402.web.app/
rooms" />
      </Helmet>
      {/* Filter */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-5 w-11/12 mx-auto">
        {rooms.map(
          (room, idx) =>
            <RoomCard key={idx} room={room}></RoomCard>
        )}
      </div>
    </div>
  );
};

export default Rooms;
