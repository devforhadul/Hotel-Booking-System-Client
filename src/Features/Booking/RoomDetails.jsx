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
  Star,
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
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useForm } from "react-hook-form";

// Main App component
const RoomDetails = () => {
  const { data } = useLoaderData();
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [tabValue, setTabValue] = useState(0);
  const [guest, setGuest] = useState(1)
  const [summaryModal, setSummaryModal] = useState(false);
  const [bookingData, setBookingData] = useState({});


  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    const bookingDatas = {
      roomId: data?._id,
      checkInDate: bookingData?.checkInDate,
      checkOutDate: bookingData?.checkOutDate,
      numberOfGuests: guest,
      userName: user?.displayName,
      userEmail: user?.email,
      userPhoto: user?.photoURL,
      isAvailable: false

    };


    // Validate user login
    if (!user) {
      toast.error("You must be logged in to book a room.");
      navigate("/login");
      return;
    }

    // Validate room availability
    if (!data?.isAvailable) {
      toast.error("This room is currently unavailable.");
      return;
    }

    // Validate booking details
    const { checkInDate, checkOutDate } = bookingData || {};
    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      setSummaryModal(false)
      toast.error("Check-out date must be later than check-in date.");
      return;
    }



    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/rooms`, bookingDatas
      );
      if (data?.insertedId) {
        toast.success("Booking confirmed successfully!");
        navigate("/my-booking");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    reset();
    setSummaryModal(false);

  };



  return (
    <div className="w-11/12 mx-auto">
      <div className="grid grid-cols-12 py-8 gap-10">
        {/* Left side */}
        <div className="col-span-8">
          {/* Images show here... */}
          <div className="grid grid-cols-3 gap-2 rounded-lg overflow-hidden">
            {/* Big image (first item in array) */}
            <div className="col-span-2 row-span-2">
              <img
                src={data?.images[0]}
                alt="Main"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Remaining images */}
            {data?.images.slice(1).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index + 2}`}
                className="w-full h-full object-cover"
              />
            ))}
          </div>

          {/* romms details show here.. */}
          <div className="mt-3">
            <div className="flex justify-between items-center my-2">
              <p>{data?.location}</p>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <Share2 size={17} className="text-Accent" />
                  <p className="text-md font-medium">Share</p>
                </div>
                <div className="flex items-center gap-1">
                  <Heart size={17} className="text-Accent" />
                  <p className="text-md font-medium">Save</p>
                </div>

              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mt-3 text-center md:text-left">
              {data?.name}
            </h1>
            {/* Rating this room*/}
            <div className=" flex items-center gap-1 mt-2">
              <span> <Star size={18} className="text-Primary" /></span>
              <p className=" rounded-md  inline-block">
                {data?.reviewRating}/5.0 (44+ Reviews)
              </p>
            </div>
            {/* Tab */}

            <div className="mt-2">
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
              <form onSubmit={handleSubmit((data) => setBookingData(data))} className="space-y-4">
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
                      //value={checkInDate}
                      //onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                      className="w-full p-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                      {...register('checkInDate', { required: true })}
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
                      //value={checkOutDate}
                      //onChange={(e) => setCheckOutDate(e.target.value)}
                      min={
                        bookingData?.checkInDate || new Date().toISOString().split("T")[0]
                      } // Check-out cannot be before check-in
                      className="w-full p-2 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                      {...register('checkOutDate', { required: true })}
                    />
                  </div>
                </div>
                {/* Guest */}
                <div>
                  <InputLabel id="demo-select-small-label">Guests</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={guest}
                    label="Age"
                    onChange={(e) => setGuest(e.target.value)}
                    className="w-full h-10"
                  >
                    <MenuItem value="1">
                      <em>Guest</em>
                    </MenuItem>
                    <MenuItem value={1}>1 Adult</MenuItem>
                    <MenuItem value={2}>2 Adult</MenuItem>
                    <MenuItem value={3}>3 Adult</MenuItem>
                    <MenuItem value={4}>4 Adult</MenuItem>
                  </Select>
                </div>
                {/* ========= */}
                <div>
                  <h3 className="text-lg text-Text font-medium">
                    Price Brackdown
                  </h3>
                </div>
                <button
                  type="submit"
                  onClick={() => {
                    if (!data?.isAvailable) {
                      toast.error("This room is currently unavailable.");
                      return;
                    }
                    if (bookingData?.checkInDate || bookingData?.checkOutDate) {
                      setSummaryModal(true)
                    }

                  }}
                  className="w-full bg-Primary  text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform cursor-pointer"
                >
                  Book Now
                </button>
              </form>

              {/* modal */}
              {summaryModal && <BookingSummaryModal data={data} user={user} setSummaryModal={setSummaryModal} handleConfirmBooking={handleConfirmBooking} bookingData={bookingData} guest={guest} />}
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
