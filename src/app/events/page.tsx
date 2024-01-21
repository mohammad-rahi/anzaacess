"use client";

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import EventCard from './EventCard';
import InputField from '@/components/InputField';
import { EventCategory, EventTypes } from './event.types';
import { supabase } from '@/config/supabase';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from('events').select('*');

        if (error) {
          console.error('Error fetching events:', error);
        }

        if (data) {
          setEvents([...data, ...data, ...data, ...data, ...data, ...data]);
        }

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('event_categories').select('*');

        if (error) {
          console.error('Error fetching categories:', error);
        }

        if (data) {
          setCategories(data);
        }

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    fetchEvents();
    fetchCategories();
  }, [])


  return (
    <div className='flex gap-8'>
      <div className='w-64'>
        <h2 className='text-2xl font-bold mb-6'>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/events/${category.category_slug}`} className='block p-2 px-4 rounded-md transition duration-300 hover:text-blue-800 hover:bg-blue-100'>
                {category.category_name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='flex-1'>
        {/* Search bar */}
        <div className='mb-8'>
          <InputField
            type='text'
            placeholder='Search events...'
            value={searchQuery}
            onChange={(ev) => setSearchQuery(ev.target.value)}
          />
        </div>

        {/* Event cards grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}
