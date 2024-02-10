"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventTypes } from './event.types';
import { Button } from '@/components';

interface EventCardProps {
  event: EventTypes;
  size?: 'sm' | 'md';
}

const EventCard: React.FC<EventCardProps> = ({ event, size = 'md' }) => {
  const { event_name, event_description, event_category, event_image, event_date, event_time, event_venue } = event;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Link
      href={`/events/${event.event_category.category_slug}/${event.event_slug}`}
      className='block group bg-white rounded-md shadow-md group-hover:shadow-lg group-hover:bg-blue-50 transition duration-300 hover:underline overflow-hidden'
    >
      <div className={`block ${size === 'sm' ? 'md:flex' : ''} relative aspect-[4/3] group-hover:scale-105 transition duration-300`}>
        {event_image && (
          <Image src={event_image} alt={event_name} objectFit="cover" layout="fill" />
        )}

        <div className="overlay p-4 text-white bg-gradient-to-b from-transparent to-black absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col gap-4 justify-end">
          <div>
            <div className="flex items-center gap-4 text-sm text-white">
              <p>
                <span className="font-semibold">Date:</span>{' '}
                {new Date(event_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {event_time}
              </p>
            </div>

            <p className="text-sm">
              <span className="font-semibold">Venue:</span> {event_venue}
            </p>
          </div>

          <h3 className={`text-xl font-bold mb-2 ${size === 'md' ? 'line-clamp-2' : ''}`}>{event_name}</h3>
        </div>
      </div>

      <div className='sm:hidden bg-blue-100 p-2 rounded-b-md overflow-hidden'>
        <h3 className={`text-xl font-bold ${size === 'md' ? 'line-clamp-2' : ''}`}>{event_name}</h3>
      </div>
    </Link>
  );
};

export default EventCard;
