import { use, useState } from "react";
import axios from "axios";
import {
  Bath,
  BedDouble,
  CalendarDays,
  CircleX,
  Coffee,
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
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

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

    setOpenModal(true);
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


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-12 py-8 gap-5">
        {/* Left side */}
        <div className="col-span-8">
          {/* Images show here... */}
          <img
            src={data?.images[currentImageIndex]}
            alt={`${data?.name} - View ${currentImageIndex + 1}`}
            className="w-full h-96 object-cover rounded-lg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/800x500/CCCCCC/666666?text=Image+Unavailable";
            }} // Fallback for broken images
          />
          {/* romms details show here.. */}
          <div>
            <div className="flex justify-between items-center">
              <p>Location</p>
              <div className="flex gap-2">
                <p>Share</p>
                <p>Save</p>
              </div>
            </div>
            <h3>Title</h3>
            <p>5 Star</p>
            {/* Tab */}

            <div>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Room Details" />
                    <Tab label="Policies" />
                    <Tab label="Reviews" />
                  </Tabs>
                </Box>
                {/* Content here */}
                {
                  value == 0 && <div>Room details here..</div>
                }
                {
                  value == 1 && <div>Polices here..</div>
                }
                {/* Reviews */}
                {value == 2 && (
                    <div className=" rounded-xl overflow-hidden my-5">
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
            <aside className="bg-gradient-to-br bg-Secondary/20 p-6 rounded-md text-black">
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
                  onClick={() => setOpenModal(true)}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Book Now
                </button>
              </form>

              {/* modal */}
              {openModal && <BookingSummaryModal data={data} user={user} setOpenModal={setOpenModal} />}
            </aside>
          </div>
        </div>
      </div >




    </div >
  );
};

export default RoomDetails;
