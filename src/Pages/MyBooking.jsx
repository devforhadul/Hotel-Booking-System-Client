import axios from "axios";
import {
  Calendar,
  CalendarDays,
  CheckCircle,
  CreditCard,
  DatabaseBackup,
  DollarSign,
  Hotel,
  XCircle,
} from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useLoaderData } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const MyBooking = () => {
  // Mock booking data
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const { data } = useLoaderData();
  const [openModal, setOpenModal] = useState(false);

  const bookedRooms = bookings?.map((booking) => {
    const room = data?.find((room) => room._id == booking.roomId);
    return {
      booked: booking,
      room: room,
    };
  });

  //Get bookings from the serverghjm
  useEffect(() => {
    axios
      .get(`http://localhost:3000/booked?email=${user?.email}`)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((error) => {
        console.log("Error fetching bookings:", error);
      });
  }, [user]);

  // Handle Cancel button click
  const handleCancel = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/booked/${bookingId}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              setBookings((prev) =>
                prev.filter((booking) => booking._id !== bookingId)
              );
              Swal.fire({
                title: "Deleted!",
                text: "Your Booking has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error("Error cancelling booking:", error);
          });
      }
    });
  };

  // Handle Update button click
  const handleUpdate = (bookingId) => {
    setOpenModal(true);
    console.log("update", bookingId);
  };

  // State for status messages (replacing alert)
  const [statusMessage, setStatusMessage] = useState("");
  const [showMessageBox, setShowMessageBox] = useState(false);

  const showStatusMessage = (message) => {
    setStatusMessage(message);
    setShowMessageBox(true);
    setTimeout(() => {
      setShowMessageBox(false);
      setStatusMessage("");
    }, 3000); // Message disappears after 3 seconds
  };

  return (
    <div className=" bg-gray-100 p-4">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-10 text-center drop-shadow-lg">
          {/* <Hotel className="inline-block mr-3 text-blue-600" size={48} /> */}
          My Bookings
        </h1>

        {bookedRooms.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600 text-lg">
            No bookings found. Start planning your next trip!
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {" "}
            {/* Changed to flex-col for vertical stacking and added gap */}
            {bookedRooms.map((booking) => (
              <div
                key={booking.room._id}
                className="grid grid-cols-12  bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl border border-gray-100" // Removed fixed width and flex-shrink-0
              >
                <div className="col-span-4 relative">
                  <img
                    src={booking.room.images[0]}
                    alt="acb"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x250/F8FAFC/0F172A?text=${encodeURIComponent(
                        booking.hotelName
                      )}`;
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    {booking.room.name}
                  </div>
                </div>

                <div className="col-span-8 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {booking.hotelName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    <Hotel
                      className="inline-block mr-1 text-blue-500"
                      size={16}
                    />
                    {booking.room.location}
                  </p>

                  <div className="flex items-center text-gray-700 mb-2">
                    <Calendar className="mr-2 text-blue-500" size={20} />
                    Check-in:{" "}
                    <span className="font-medium ml-1">
                      {booking.booked.checkInDate}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700 mb-4">
                    <Calendar className="mr-2 text-blue-500" size={20} />
                    Check-out:{" "}
                    <span className="font-medium ml-1">
                      {booking.booked.checkOutDate}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm mb-4">
                    <div>
                      Guests:{" "}
                      <span className="font-semibold">
                        {booking.booked.numberOfGuests}
                      </span>
                    </div>
                    {/* <div>
                      Rooms:{" "}
                      <span className="font-semibold">{booking.rooms}</span>
                    </div> */}
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center text-green-700 text-2xl font-extrabold">
                      <DollarSign className="mr-1 text-green-600" size={24} />
                      {booking.room.pricePerNight}
                    </div>

                    {/* <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending Payment"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status === "Confirmed" && (
                        <CheckCircle className="inline-block mr-1" size={14} />
                      )}
                      {booking.status === "Cancelled" && (
                        <XCircle className="inline-block mr-1" size={14} />
                      )}
                      {booking.status === "Pending Payment" && (
                        <CreditCard className="inline-block mr-1" size={14} />
                      )}
                      {booking.status}
                    </span> */}
                    <div
                      onClick={() => handleUpdate(booking.booked._id)}
                      className="flex items-center text-gray-500 gap-2"
                    >
                      Update Date
                      <DatabaseBackup />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {/* {booking.status === "Pending Payment" && (
                      <button
                        onClick={() => handlePay(booking._id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                      >
                        <CreditCard className="mr-2" size={20} /> Pay Now
                      </button>
                    )} */}

                    <button
                      onClick={() => handleCancel(booking.booked._id)}
                      className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center justify-center`}
                    >
                      <XCircle className="mr-2" size={20} /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Message Box (replaces alert) */}
        {showMessageBox && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-lg shadow-xl text-center z-50 transition-all duration-300 ease-out animate-fade-in-up">
            {statusMessage}
          </div>
        )}
      </div>
      {openModal && (
        <>
          {/* Modal for update */}
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <div>
                <form  className="space-y-4">
                  <div>
                    <label
                      htmlFor="check-in"
                      className="block text-sm font-semibold mb-2"
                    >
                      <CalendarDays size={16} className="inline-block mr-2" />{" "}
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      id="check-in"
                      // value={checkInDate}
                      // onChange={(e) => setCheckInDate(e.target.value)}
                      // min={new Date().toISOString().split("T")[0]} 
                      className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="check-out"
                      className="block text-sm font-semibold mb-2"
                    >
                      <CalendarDays size={16} className="inline-block mr-2" />{" "}
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      id="check-out"
                      // value={checkOutDate}
                      // onChange={(e) => setCheckOutDate(e.target.value)}
                      // min={
                      //   checkInDate || new Date().toISOString().split("T")[0]
                      // } 
                      className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    Update Booking
                  </button>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button onClick={() => setOpenModal(false)} className="btn">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}

      <Toaster></Toaster>
    </div>
  );
};

export default MyBooking;
