import { use, useState } from "react";
import axios from "axios";
import {
  Bath,
  BedDouble,
  CalendarDays,
  CircleX,
  Coffee,
  Heart,
  Share2,
  Snowflake,
  Tv,
  User,
  Utensils,
  Wifi,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import BookingSummaryModal from "../../Components/modal/BookingSummaryModal";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ReviewCard from "../../Components/card/ReviewCard";

// Main App component
const RoomDetails = () => {
  const { data } = useLoaderData();
  const { user } = use(AuthContext);

  const [tabValue, setTabValue] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [message, setMessage] = useState("");
  const [confirmBookModal, setConfirmBookModal] = useState(false);
  const navigate = useNavigate();



  // Handle booking submission
  const handleBooking = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book a room.");
      return navigate("/login");
    }

    if (!data?.isAvailable) {
      return toast.error("Not Available this room Right now!!");
    }

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

    confirmBookModal(true);
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    const bookingData = {
      roomId: data?._id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numberOfGuests: numberOfGuests,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
    };

    const availability = {
      isAvailable: false,
    };

    axios
      .post(
        "https://modern-hotel-booking-server-nine.vercel.app/rooms",
        bookingData
      )
      .then((response) => {
        //console.log("Booking successful:", response.data);
        toast.success("Booking confirmed successfully!");
        navigate("/my-booking");
        // after confirming booking avaiolability false for not available room
        axios
          .patch(
            `https://modern-hotel-booking-server-nine.vercel.app/rooms/booked/${data?._id}`,
            availability
          )
          .then((res) => {
            //console.log("Room availability updated:", res.data);
          })
          .catch((error) => {
            console.error("Error updating room availability:", error);
          });
      })
      .catch((error) => {
        console.error("Error booking room:", error);
        setMessage("Failed to confirm booking. Please try again later.");
      });

    // Clear form
    setCheckInDate("");
    setCheckOutDate("");
    setNumberOfGuests(1);
  };





  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-12 py-8 gap-10">
        {/* Left side */}
        <div className="col-span-8">
          {/* Images show here... */}
          <img
            src={data?.images[0]}
            alt=""
            className="w-full h-96 object-cover rounded-lg"
          />
          {/* romms details show here.. */}
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <p>Location</p>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <Share2 size={17}/>
                  <p className="text-md font-medium">Share</p>
                </div>
                <div className="flex items-center">
                  <p className="text-md font-medium">Save</p>
                  <Heart size={17}/>
                </div>

              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
              {data?.name}
            </h1>
            {/* Rating this room*/}
            <div className="mb-4">
              <p className="px-4 py-1.5 rounded-md border bg-[#ecf3fe] border-[#4073bf] inline-block">
                {data?.reviewRating}/5.0
              </p>
            </div>
            {/* Tab */}

            <div>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} aria-label="basic tabs example">
                    <Tab label="Room Details" />
                    <Tab label="Policies" />
                    <Tab label="Reviews" />
                  </Tabs>
                </Box>
                {/* Content here */}
                {/* Left Column: Description & Amenities */}
                {
                  tabValue == 0 && (
                    <div className="my-3">
                      {/* Description */}
                      <section className="mb-3">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                          Description
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                          {data?.description}
                        </p>
                      </section>

                      {/* Fecilites */}
                      <section className="">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                          Hotel Details
                        </h2>
                        <div className="mb-3">
                          <p>{data?.hotelType} Hotel</p>
                          <p>Location: {data?.location} </p>
                          <p>Bad type: {data?.bedType}</p>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                          Facilities
                        </h2>
                        <div className="">
                          {data.facilities.map((facilitie, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 text-gray-700"
                            >
                              {/* <span className="text-blue-500">{amenity.icon}</span> */}
                              <li>{facilitie}</li>
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>
                  )
                }
                {
                  tabValue == 1 && <div>Polices here..</div>
                }
                {tabValue == 2 && (
                  <div className=" rounded-xl overflow-hidden my-3">
                    {/* <h3 className="text-2xl font-bold mb-3">Reviews</h3> */}
                    {data?.reviews?.length > 0 ? (
                      data?.reviews.map((review, idx) => (
                        <ReviewCard key={idx} review={review}></ReviewCard>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        <p>No reviews yet. Be the first to review this room!</p>
                      </div>
                    )}
                  </div>
                )
                }
              </Box>
            </div>
          </div>

        </div>
        {/* Right side */}
        <div className="col-span-4">
          {/* Booking Form */}
          <div className="md:col-span-1">
            <aside className="bg-gradient-to-br bg-Secondary/20 dark:bg-slate-800/50 p-6 rounded-md text-black">
              <h2 className="text-2xl font-semibold mb-4">
                ${data?.pricePerNight}{" "}
                <span className="text-xl font-medium">/ night</span>
              </h2>
              <form onSubmit={handleBooking} className="space-y-4">
                <div className="flex items-center justify-between gap-1">
                  {/* Checked in */}
                  <div>
                    <label
                      htmlFor="check-in"
                      className="block text-sm font-medium mb-2"
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
                      className="w-full p-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                    />
                  </div>
                  {/* Checked out */}
                  <div>
                    <label
                      htmlFor="check-out"
                      className="block text-sm font-medium mb-2"
                    >
                      <CalendarDays size={16} className="inline-block mr-2" />{" "}
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      id="check-out"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={
                        checkInDate || new Date().toISOString().split("T")[0]
                      } // Check-out cannot be before check-in
                      className="w-full p-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="guests"
                    className="block text-sm font-medium mb-2"
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
                    max={data?.roomCapacity || 1}
                    className="w-full p-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                    required
                  />
                </div>
                <div>
                  <h3 className="text-lg text-Text font-medium">
                    Price Brackdown
                  </h3>
                </div>
                <button
                  type="submit"
                  onClick={() => setConfirmBookModal(true)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Book Now
                </button>
              </form>

              {/* modal */}
              {confirmBookModal && <BookingSummaryModal data={data} user={user} setOpenModal={setConfirmBookModal} handleConfirmBooking={handleConfirmBooking} />}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
