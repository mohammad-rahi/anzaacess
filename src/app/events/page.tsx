"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import EventCard from './EventCard';
import InputField from '@/components/InputField';
import { EventCategory, EventTypes } from './event.types';
import { supabase } from '@/config/supabase';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MobileCategories from './MobileCategories';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [eventLoading, setEventLoading] = useState<boolean>(true);

  useEffect(() => {
    const initialEvents = async () => {
      try {
        let { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'published')

        if (error) {
          console.error('Error fetching events:', error);
        }

        if (data) {
          setEvents(data);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
      finally {
        setEventLoading(false);
      }
    };

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
      finally {
        setCategoryLoading(false);
      }
    };

    initialEvents();
    fetchCategories();
  }, [searchQuery]);

  const fetchEvents = async () => {
    try {
      let { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .textSearch('event_name', `"${searchQuery}"`, { type: 'plain', config: 'english' })

      if (error) {
        console.error('Error fetching events:', error);
      }

      if (data) {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    finally {
      setEventLoading(false);
    }
  };

  const debouncedFetchEvents = _debounce(fetchEvents, 300);

  const handleSearchChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = ev.target;

    setSearchQuery(value);

    debouncedFetchEvents();
  };

  return (
    <div className='flex gap-8'>
      <div className='w-64 hidden lg:block'>
        <h2 className='text-2xl font-bold mb-6'>Categories</h2>
        <ul>
          {
            categoryLoading ? (
              <Skeleton count={10} className='h-8 w-full rounded-md' baseColor='white' />
            ) : (
              categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id}>
                    <Link href={`/events/${category.category_slug}`} className={`block p-2 px-4 rounded-md transition duration-300 hover:text-blue-800 hover:bg-blue-100`}>
                      {category.category_name}
                    </Link>
                  </li>
                ))
              ) : (
                <p>No categories found.</p>
              )
            )
          }
        </ul>
      </div>

      <div className='flex-1 space-y-4'>
        <div className='flex items-center gap-8'>
          <MobileCategories
            categoryLoading={categoryLoading}
            categories={categories}
          />

          <div className='flex-1'>
            {/* Search bar */}
            <InputField
              type='text'
              placeholder='Search events...'
              value={searchQuery}
              onChange={handleSearchChange} // Use the debounced function here
            />
          </div>
        </div>

        {/* Event cards grid */}
        {
          eventLoading ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {
                Array.from({ length: 6 }).map((_, index) => (
                  <div className='w-full block' key={index}>
                    <Skeleton className='h-96 rounded-md' baseColor='white' />
                  </div>
                ))
              }
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
              {
                eventLoading ? (
                  <Skeleton className='h-96 rounded-md' baseColor='white' count={10} />
                ) : (
                  events.length > 0 ? (
                    events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))
                  ) : (
                    <p>No events found.</p>
                  )
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}
