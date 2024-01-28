import React from 'react';
import { EventTypes } from './event.types';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  event: EventTypes;
  size?: 'sm' | 'md';
}

const EventCard: React.FC<EventCardProps> = ({ event, size = 'md' }) => {
  const { event_name, event_description, event_category, event_image, event_date, event_time, event_venue } = event;

  return (
    <>
      {
        size == "md" ? (
          <Link href={`/events/${event.event_category.category_slug}/${event.event_slug}`} className='group'>
            <div className="bg-white rounded-md shadow overflow-hidden group-hover:shadow-lg group-hover:bg-blue-50 transition duration-300 h-full">
              <div className="relative aspect-[16/9] overflow-hidden rounded-t-md">
                {event_image && <Image src={event_image} alt={event_name} objectFit="cover" layout="fill" />}
              </div>

              <div className="flex flex-col gap-3 p-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{event_name}</h3>
                  <p className="text-gray-600 mb-3">{event_description?.slice(0, 100)}...</p>
                  <div className="flex items-center text-sm">
                    <p className="text-gray-500">Category:</p>
                    <span className="ml-2 text-blue-500 font-semibold">{event_category.category_name}</span>
                  </div>
                </div>

                <div className="flex flex-col items-start text-xs text-gray-500">
                  <div className="flex items-center gap-4 mb-2">
                    <p>
                      <span className="font-semibold">Date:</span> {new Date(event_date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span> {event_time}
                    </p>
                  </div>
                  <p>
                    <span className="font-semibold">Venue:</span> {event_venue}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ) : (
          <>
            <Link href={`/events/${event.event_category.category_slug}/${event.event_slug}`} className='group'>
              <div className="group-hover:bg-blue-50 transition duration-300 grid grid-cols-1 gap-1 p-4 md:p-8 rounded-md">
                <div className="relative aspect-square h-full overflow-hidden rounded-full">
                  {event_image && <Image src={event_image} alt={event_name} objectFit="cover" layout="fill" />}
                </div>

                <div className="p-2">
                  <h3 className="text-xs font-semibold mb-1 group-hover:underline text-center">{event_name.length > 20 ? event_name.slice(0, 20) + '...' : event_name}</h3>
                  {/* <p className="text-gray-600 mb-3 text-sm hidden md:block">{event_description.slice(0, 60)}...</p> */}
                </div>
              </div>
            </Link>
          </>
        )
      }
    </>
  );
};

export default EventCard;
