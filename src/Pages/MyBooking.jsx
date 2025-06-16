import { Calendar, CheckCircle, CreditCard, DollarSign, Hotel, XCircle } from "lucide-react";
import React, { useState } from "react";

const MyBooking = () => {
  // Mock booking data
  const [bookings, setBookings] = useState([
    {
      id: "BKG001",
      hotelName: "Grand Hyatt Dhaka",
      location: "Dhaka, Bangladesh",
      checkIn: "2025-07-10",
      checkOut: "2025-07-15",
      guests: 2,
      rooms: 1,
      totalPrice: 750.0,
      status: "Pending Payment", // Can be 'Pending Payment', 'Confirmed', 'Cancelled'
      imageUrl: "https://placehold.co/400x250/F8FAFC/0F172A?text=Grand+Hyatt",
    },
    {
      id: "BKG002",
      hotelName: "The Westin Dhaka",
      location: "Dhaka, Bangladesh",
      checkIn: "2025-08-01",
      checkOut: "2025-08-05",
      guests: 3,
      rooms: 2,
      totalPrice: 1200.0,
      status: "Confirmed",
      imageUrl: "https://placehold.co/400x250/F8FAFC/0F172A?text=The+Westin",
    },
    {
      id: "BKG003",
      hotelName: "Radisson Blu Chittagong",
      location: "Chittagong, Bangladesh",
      checkIn: "2025-09-20",
      checkOut: "2025-09-22",
      guests: 1,
      rooms: 1,
      totalPrice: 300.0,
      status: "Cancelled",
      imageUrl: "https://placehold.co/400x250/F8FAFC/0F172A?text=Radisson+Blu",
    },
    {
      id: "BKG004",
      hotelName: "InterContinental Dhaka",
      location: "Dhaka, Bangladesh",
      checkIn: "2025-10-01",
      checkOut: "2025-10-03",
      guests: 2,
      rooms: 1,
      totalPrice: 500.0,
      status: "Pending Payment",
      imageUrl:
        "https://placehold.co/400x250/F8FAFC/0F172A?text=InterContinental",
    },
    {
      id: "BKG005",
      hotelName: "Pan Pacific Sonargaon Dhaka",
      location: "Dhaka, Bangladesh",
      checkIn: "2025-11-10",
      checkOut: "2025-11-14",
      guests: 4,
      rooms: 2,
      totalPrice: 1500.0,
      status: "Confirmed",
      imageUrl: "https://placehold.co/400x250/F8FAFC/0F172A?text=Pan+Pacific",
    },
  ]);

  

  // Handle Pay button click
  const handlePay = (bookingId) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId && booking.status === "Pending Payment"
          ? { ...booking, status: "Confirmed" }
          : booking
      )
    );
    showStatusMessage(`Initiating payment for booking ${bookingId}.`);
  };

  // Handle Cancel button click
  const handleCancel = (bookingId) => {
    // Implement a confirmation dialog (not alert, but for demo using alert temporarily)
    if (
      window.confirm(`Are you sure you want to cancel booking ${bookingId}?`)
    ) {
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId && booking.status !== "Cancelled"
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );
      showStatusMessage(`Booking ${bookingId} has been cancelled.`);
    }
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

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600 text-lg">
            No bookings found. Start planning your next trip!
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {" "}
            {/* Changed to flex-col for vertical stacking and added gap */}
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl border border-gray-100" // Removed fixed width and flex-shrink-0
              >
                <div className="relative h-48 sm:h-56">
                  <img
                    src={booking.imageUrl}
                    alt={booking.hotelName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x250/F8FAFC/0F172A?text=${encodeURIComponent(
                        booking.hotelName
                      )}`;
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    #{booking.id}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {booking.hotelName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    <Hotel
                      className="inline-block mr-1 text-blue-500"
                      size={16}
                    />
                    {booking.location}
                  </p>

                  <div className="flex items-center text-gray-700 mb-2">
                    <Calendar className="mr-2 text-blue-500" size={20} />
                    Check-in:{" "}
                    <span className="font-medium ml-1">{booking.checkIn}</span>
                  </div>
                  <div className="flex items-center text-gray-700 mb-4">
                    <Calendar className="mr-2 text-blue-500" size={20} />
                    Check-out:{" "}
                    <span className="font-medium ml-1">{booking.checkOut}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm mb-4">
                    <div>
                      Guests:{" "}
                      <span className="font-semibold">{booking.guests}</span>
                    </div>
                    <div>
                      Rooms:{" "}
                      <span className="font-semibold">{booking.rooms}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center text-green-700 text-2xl font-extrabold">
                      <DollarSign className="mr-1 text-green-600" size={24} />
                      {booking.totalPrice.toFixed(2)}
                    </div>
                    <span
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
                    </span>
                  </div>

                  <div className="flex space-x-4">
                    {booking.status === "Pending Payment" && (
                      <button
                        onClick={() => handlePay(booking.id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                      >
                        <CreditCard className="mr-2" size={20} /> Pay Now
                      </button>
                    )}
                    {booking.status !== "Cancelled" && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className={`flex-1 ${
                          booking.status === "Confirmed"
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-gray-400 hover:bg-gray-500"
                        } text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center justify-center`}
                      >
                        <XCircle className="mr-2" size={20} /> Cancel
                      </button>
                    )}
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
    </div>
  );
};

export default MyBooking;
