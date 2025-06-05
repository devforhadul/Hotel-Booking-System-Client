import React from 'react';
import Hero from '../Features/Home/Hero';
import MapSection from '../Features/Home/MapSection';
import RoomCard from '../Components/RoomCard';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            {/* <MapSection></MapSection> */}
            <RoomCard></RoomCard>
        </div>
    );
};

export default Home;