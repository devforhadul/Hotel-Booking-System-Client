import React from 'react';
import Hero from '../Features/Home/Hero';
import MapSection from '../Features/Home/MapSection';
import RoomSection from '../Features/Home/RoomSection';
import HowBooking from '../Features/Home/HowBooking';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <MapSection></MapSection>
            <RoomSection></RoomSection>
            <HowBooking></HowBooking>
        </div>
    );
};

export default Home;