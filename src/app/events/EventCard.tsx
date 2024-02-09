"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EventTypes } from './event.types';

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
      className={`group block ${size === 'sm' ? 'md:flex' : ''} p-4 md:p-8 bg-white rounded-md shadow-md group-hover:shadow-lg group-hover:bg-blue-50 transition duration-300 hover:underline`}
    >
      <div
        className={`${size === 'sm' ? 'md:w-1/2' : 'relative aspect-[4/3] overflow-hidden md:w-1/3'}`}
      >
        {event_image && (
          <Image src={event_image} alt={event_name} objectFit="cover" layout="fill" />
        )}
      </div>

      <div
        className={`flex flex-col ${size === 'sm' ? 'md:w-1/2 md:ml-4' : 'md:ml-8'} mt-4 md:mt-0`}
      >
        <h3
          className={`text-xl md:text-2xl font-bold mb-2 ${size === 'sm' ? 'line-clamp-2' : ''}`}
        >
          {event_name}
        </h3>
        {size === 'md' && (
          <p
            className={`text-gray-600 mb-3 ${isExpanded ? 'line-clamp-none' : 'line-clamp-3'
              } transition-max-height ease-in-out duration-300 overflow-hidden`}
          >
            {event_description}
          </p>
        )}

        <div className="flex items-center text-sm mb-2">
          <p className="text-gray-500">Category:</p>
          <span className="ml-2 text-blue-500 font-semibold">
            {event_category.category_name}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
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

        <p className="text-sm mt-2">
          <span className="font-semibold">Venue:</span> {event_venue}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
