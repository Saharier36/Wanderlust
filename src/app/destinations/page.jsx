import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationPage = async () => {
    const res = await fetch("http://localhost:5000/destinations");
    const destinations = await res.json()
    
    return (
      <div className="container mx-auto my-10 px-6">
        <h1 className="text-2xl font-bold">Explore All Destinations</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          {destinations.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </div>
      </div>
    );
};

export default DestinationPage;