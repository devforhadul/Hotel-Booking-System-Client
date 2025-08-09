import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";



const Tesimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('https://modern-hotel-booking-server-nine.vercel.app/rooms')
      .then(res => {
        setRooms(res?.data);
      })

  }, []);

  const testimonials = rooms.flatMap(room => room?.reviews || []);


  // Function to go to the previous testimonial
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next testimonial
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="pt-8 md:pt-12 lg:pt-16">
      <h1 className="text-2xl text-center text-Text dark:text-white font-semibold mb-6">Our Client Reviews</h1>
      <div className=" flex items-center justify-center ">

        <div className="relative w-11/12 mx-auto bg-white dark:bg-slate-800/50 shadow-xl hover:shadow-lg rounded-xl p-6 sm:p-8 md:p-10 flex flex-col items-center">
          {/* Testimonial Quote */}
          <blockquote className="text-center text-lg sm:text-xl font-medium text-Text dark:text-white mb-6 leading-relaxed italic">
            "{currentTestimonial?.description}"
          </blockquote>

          {/* Author Information */}
          <div className="flex flex-col items-center">
            <img
              src={currentTestimonial?.photo}
              alt={currentTestimonial?.name}
              className="w-24 h-24 rounded-full border-4 border-indigo-400 mb-4 object-cover shadow-md"
              // Fallback in case image fails to load
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/CCCCCC/666666?text=User";
              }}
            />
            <p className="text-xl sm:text-2xl font-semibold text-Text dark:text-white mb-1">
              {currentTestimonial?.name}
            </p>
            <p className="text-md sm:text-lg text-indigo-600">
              {currentTestimonial?.email}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 px-4">
            <button
              onClick={goToPrevious}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Previous Testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Next Testimonial"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Dots for navigation */}
          <div className="flex space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full ${currentIndex === index
                    ? "bg-indigo-500"
                    : "bg-gray-300 hover:bg-gray-400"
                  } transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tesimonial;
