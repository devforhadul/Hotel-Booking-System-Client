import React from 'react';
import RoomCard from '../../Components/RoomCard';

const RoomSection = () => {
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-11/12 mx-auto'>
                <RoomCard></RoomCard>
            </div>
        </div>
    );
};

export default RoomSection;