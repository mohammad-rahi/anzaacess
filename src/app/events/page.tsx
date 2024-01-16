"use client";

import Link from 'next/link'
import React, { useState } from 'react'
import { EventTypes } from './event.types';
import EventCard from './EventCard';
import InputField from '@/components/InputField';

const events: EventTypes[] = [
  {
    id: '1',
    profile_id: 'user1',
    event_name: 'Event 1',
    event_description: 'Description for Event 1',
    event_category: 'Category 1',
    event_image: 'image1.jpg',
    event_date_time: '2024-01-15T18:00:00',
    event_venue: 'Venue 1',
    ticket_types: 'Free',
  },
  {
    id: '2',
    profile_id: 'user2',
    event_name: 'Event 2',
    event_description: 'Description for Event 2',
    event_category: 'Category 2',
    event_image: 'image2.jpg',
    event_date_time: '2024-01-15T18:00:00',
    event_venue: 'Venue 2',
    ticket_types: 'Paid',
  },
  {
    id: '3',
    profile_id: 'user3',
    event_name: 'Event 3',
    event_description: 'Description for Event 3',
    event_category: 'Category 3',
    event_image: 'image3.jpg',
    event_date_time: '2024-01-15T18:00:00',
    event_venue: 'Venue 3',
    ticket_types: 'Free',
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('');

  // Filter events based on search query and selected category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.event_category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className='bg-blue-50'>
      <div className="wrapper min-h-screen py-16">
        <div className='flex gap-8'>
          <div className='space-y-4 w-64'>
            <h2 className='text-3xl font-bold'>Categories</h2>

            <div>
              <ul>
                <li>
                  <Link href="#" className='hover:text-blue-800 font-bold hover:bg-blue-100 transition duration-300 px-4 py-2 rounded-md overflow-hidden block' title='Category 1'>
                    Category 1
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className='flex-1'>
            {/* Search bar */}
            <div className='mb-4'>
              <InputField
                type='text'
                placeholder='Search events...'
                value={searchQuery}
                onChange={(ev) => setSearchQuery(ev.target.value)}
              />
            </div>

            {/* Event cards grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredEvents.map((event) => (
                <Link href={`/events/${event.id}`} key={event.id}>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
