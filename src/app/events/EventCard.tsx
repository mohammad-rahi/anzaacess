import React from 'react';
import { EventTypes } from './event.types';
import Image from 'next/image';

interface EventCardProps {
    event: EventTypes;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { id, event_name, event_description, event_category, event_image, event_date_time, event_venue, ticket_types } = event;

    return (
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
            <div className='relative aspect-video rounded-md overflow-hidden bg-blue-100'>
                {
                    !event_image && (
                        <Image src={event_image} alt={event_name} objectFit='cover' fill />
                    )
                }
            </div>

            <div>
                <h3 className="text-xl font-bold mb-2">{event_name}</h3>
                <p className="text-gray-600 mb-2">{event_description}</p>
                <p className="text-gray-500 mb-2">Category: {event_category}</p>
                <p className="text-gray-500 mb-2">Date & Time: {new Date(event_date_time).toLocaleString()}</p>
                <p className="text-gray-500 mb-2">Venue: {event_venue}</p>
                <p className="text-gray-500">Ticket Types: {ticket_types}</p>
            </div>
        </div>
    );
};

export default EventCard;
