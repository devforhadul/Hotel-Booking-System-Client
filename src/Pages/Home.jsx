import React from 'react';
import Hero from '../Features/Home/Hero';
import MapSection from '../Features/Home/MapSection';
import RoomSection from '../Features/Home/RoomSection';


const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <MapSection></MapSection>
            <RoomSection></RoomSection>
        </div>
    );
};

export default Home;