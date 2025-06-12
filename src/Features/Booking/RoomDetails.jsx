import React, { useState } from "react";
// Assuming 'lucide-react' is available for icons. If not, you can replace with inline SVGs or other icon libraries.
import {
  BedDouble,
  Bath,
  Wifi,
  Tv,
  Coffee,
  Utensils,
  Snowflake,
  User,
  CalendarDays,
} from "lucide-react";
import { useLoaderData } from "react-router";

// Main App component
const RoomDetails = () => {
  const {data} = useLoaderData();
  console.log(data);

  // Dummy room data for demonstration
  const room = {
    id: "room-101",
    name: "Deluxe King Suite",
    description:
      "Experience unparalleled comfort in our spacious Deluxe King Suite. Featuring a luxurious king-sized bed, a modern en-suite bathroom, and panoramic city views, this suite is designed for ultimate relaxation. Perfect for couples or solo travelers seeking a premium stay.",
    pricePerNight: 250,
    images: [
      "https://placehold.co/800x500/A7F3D0/10B981?text=Room+View+1",
      "https://placehold.co/800x500/93C5FD/1D4ED8?text=Room+View+2",
      "https://placehold.co/800x500/FECACA/EF4444?text=Room+View+3",
      "https://placehold.co/800x500/DDD6FE/6D28D9?text=Bathroom+View",
    ],
    amenities: [
      { icon: <BedDouble size={20} />, name: "King Bed" },
      { icon: <Bath size={20} />, name: "Private Bathroom" },
      { icon: <Wifi size={20} />, name: "Free Wi-Fi" },
      { icon: <Tv size={20} />, name: "Smart TV" },
      { icon: <Coffee size={20} />, name: "Coffee Maker" },
      { icon: <Utensils size={20} />, name: "Mini-bar" },
      { icon: <Snowflake size={20} />, name: "Air Conditioning" },
    ],
    maxGuests: 2,
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState("");

  // Handle image navigation
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length
    );
  };

  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || numberOfGuests <= 0) {
      setMessage("Please fill in all booking details.");
      return;
    }
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setMessage("Check-out date must be after check-in date.");
      return;
    }
    if (numberOfGuests > room.maxGuests) {
      setMessage(
        `This room can accommodate a maximum of ${room.maxGuests} guests.`
      );
      return;
    }
    // In a real application, you would send this data to a backend API
    setMessage(
      `Booking for ${room.name} from ${checkInDate} to ${checkOutDate} for ${numberOfGuests} guests confirmed! (This is a demo message)`
    );
    // Clear form
    setCheckInDate("");
    setCheckOutDate("");
    setNumberOfGuests(1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 font-sans">
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-xl overflow-hidden p-6 md:p-8">
        {/* Room Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
          {data?.name}
        </h1>

        {/* Image Gallery */}
        <div className="relative mb-8 rounded-lg overflow-hidden shadow-md">
          <img
            src={room.images[currentImageIndex]}
            alt={`${room.name} - View ${currentImageIndex + 1}`}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/800x500/CCCCCC/666666?text=Image+Unavailable";
            }} // Fallback for broken images
          />
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <button
              onClick={goToPreviousImage}
              className="bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Previous image"
            >
              &#9664; {/* Left arrow */}
            </button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2">
            <button
              onClick={goToNextImage}
              className="bg-white/70 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-label="Next image"
            >
              &#9654; {/* Right arrow */}
            </button>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  currentImageIndex === index ? "bg-blue-600" : "bg-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                aria-label={`Go to image ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Room Details & Booking Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Description & Amenities */}
          <div className="md:col-span-2">
            {/* Description */}
            <section className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                About This Room
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {room.description}
              </p>
            </section>

            {/* Amenities */}
            <section className="p-6 bg-green-50 rounded-lg shadow-inner">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {room.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 text-gray-700"
                  >
                    <span className="text-blue-500">{amenity.icon}</span>
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Form */}
          <div className="md:col-span-1">
            <aside className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white">
              <h2 className="text-3xl font-extrabold mb-4 text-center">
                ${room.pricePerNight}{" "}
                <span className="text-xl font-medium">/ night</span>
              </h2>
              <form onSubmit={handleBooking} className="space-y-4">
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
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
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
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={checkInDate || new Date().toISOString().split("T")[0]} // Check-out cannot be before check-in
                    className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-semibold mb-2"
                  >
                    <User size={16} className="inline-block mr-2" /> Number of
                    Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    value={numberOfGuests}
                    onChange={(e) =>
                      setNumberOfGuests(
                        Math.max(1, parseInt(e.target.value) || 1)
                      )
                    }
                    min="1"
                    max={room.maxGuests}
                    className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    required
                  />
                  <p className="text-xs text-blue-100 mt-1">
                    Max guests: {room.maxGuests}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Book Now
                </button>
              </form>
              {message && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">
                  {message}
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
