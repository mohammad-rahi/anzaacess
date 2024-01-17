import React from 'react';
import { EventTypes } from './event.types';
import Image from 'next/image';

interface EventCardProps {
  event: EventTypes;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { event_name, event_description, event_category, event_image, event_date, event_time, event_venue, tickets } = event;

  return (
    <div className="bg-white p-6 rounded-md shadow-md space-y-4">
      <div className='relative aspect-video rounded-md overflow-hidden bg-blue-50'>
        {!event_image && <Image src={event_image} alt={event_name} objectFit='cover' layout="fill" />}
      </div>

      <div>
        <h3 className="text-2xl font-bold mb-2">{event_name}</h3>
        <p className="text-gray-600 mb-2">{event_description}</p>
        <p className="text-gray-500 mb-2">Category: {event_category.category_name}</p>
        <p className="text-gray-500 mb-2">Date & Time: {new Date(event_date).toLocaleString()} at {event_time}</p>
        <p className="text-gray-500 mb-2">Venue: {event_venue}</p>
        
      </div>
    </div>
  );
};

export default EventCard;
