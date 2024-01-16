"use client";

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { EventTypes } from './event.types';
import EventCard from './EventCard';
import InputField from '@/components/InputField';
import FilterOptions from './FilterOptions';

const events: EventTypes[] = [
  {
    id: '1',
    profile_id: 'user1',
    event_name: 'Event 1',
    event_slug: 'event-1',
    event_description: 'Description for Event 1',
    event_category: {
      id: '1',
      category_name: 'Category 1',
      category_slug: 'category-1',
    },
    event_image: 'image1.jpg',
    event_date_time: '2024-01-15T18:00:00',
    event_venue: 'Venue 1',
    ticket_types: 'Free',
  },
  {
    id: '2',
    profile_id: 'user2',
    event_name: 'Event 2',
    event_slug: 'event-2',
    event_description: 'Description for Event 2',
    event_category: {
      id: '2',
      category_name: 'Category 2',
      category_slug: 'category-2',
    },
    event_image: 'image2.jpg',
    event_date_time: '2024-01-15T18:00:00',
    event_venue: 'Venue 2',
    ticket_types: 'Paid',
  },
  {
    id: '3',
    profile_id: 'user3',
    event_name: 'Event 3',
    event_slug: 'event-3',
    event_description: 'Description for Event 3',
    event_category: {
      id: '3',
      category_name: 'Category 3',
      category_slug: 'category-3',
    },
    event_image: 'image3.jpg',
    event_date_time: '2024-01-15T18:00:00',
    event_venue: 'Venue 3',
    ticket_types: 'Free',
  }
];

const ticketTypeOptions = ['Free', 'Paid'];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchElementRef = useRef<HTMLInputElement>(null);

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('');

  // State for selected ticket type filter
  const [selectedTicketType, setSelectedTicketType] = useState('');

  // Filter events based on search query, selected category, and selected ticket type
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.event_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? event.event_category.category_slug === selectedCategory : true;
    const matchesTicketType = selectedTicketType ? event.ticket_types === selectedTicketType : true;
    return matchesSearch && matchesCategory && matchesTicketType;
  });

  useEffect(() => {
    window.addEventListener('keydown', (ev) => {
      if (ev.key === '/') {
        searchElementRef.current?.focus();
      }
    });
  }, []);

  return (
    <div className='flex gap-8'>
      <div className='w-64'>
        <h2 className='text-3xl font-bold mb-6'>Categories</h2>
        <ul>
          {['Category 1', 'Category 2', 'Category 3'].map((category) => (
            <li key={category} className='mb-2'>
              <Link href='#' className='block p-2 rounded-md transition duration-300 hover:text-blue-800 hover:bg-blue-100'>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex-1'>
        {/* Search bar */}
        <div className='mb-8'>
          <InputField
            ref={searchElementRef}
            type='text'
            placeholder='Search events...'
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
          />
        </div>

        {/* Filter options */}
        <FilterOptions
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          ticketTypeOptions={ticketTypeOptions}
          selectedTicketType={selectedTicketType}
          setSelectedTicketType={setSelectedTicketType}
        />

        {/* Event cards grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredEvents.map((event) => (
            <Link href={`/events/${event.event_category.category_slug}/${event.event_slug}`} key={event.id}>
              <EventCard event={event} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
