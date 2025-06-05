import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import sliderImg1 from '../../assets/Images/hotel_bookig_img1.jpg'
import sliderImg2 from '../../assets/Images/hotel_bookig_img2.jpg'
import sliderImg3 from '../../assets/Images/hotel_bookig_img3.jpg'

const Hero = () => {
  return (
    <div>
      <Swiper
        modules={[Pagination]}
        className="mySwiper"
        pagination={{ clickable: true }}
      >
        <SwiperSlide>
          <img
            src={sliderImg1}
            alt="Hotel Room"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h2>
            <p className="text-lg mb-6 max-w-xl">
              Experience luxury, comfort, and convenience in one place.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
              Book Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={sliderImg2}
            alt="Hotel Room"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h2>
            <p className="text-lg mb-6 max-w-xl">
              Experience luxury, comfort, and convenience in one place.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
              Book Now
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={sliderImg3}
            alt="Hotel Room"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-4">Welcome to Our Hotel</h2>
            <p className="text-lg mb-6 max-w-xl">
              Experience luxury, comfort, and convenience in one place.
            </p>
            <button className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition">
              Book Now
            </button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
