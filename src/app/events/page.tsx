"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import EventCard from './EventCard';
import { EventCategory, EventTypes } from './event.types';
import { supabase } from '@/config/supabase';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EventsCategory from '../EventsCategory';
import InputField from '@/components/InputField';

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<EventTypes[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [eventLoading, setEventLoading] = useState<boolean>(true);

  const eventsWithCategory: { [key: string]: EventTypes[] } = {};

  events.forEach((event) => {
    if (event.event_category) {
      if (!eventsWithCategory[event.event_category.category_name]) {
        eventsWithCategory[event.event_category.category_name] = [];
      }
      eventsWithCategory[event.event_category.category_name].push(event);
    }
  })

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
          setEvents([...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[])]);
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
        // setEvents(data);      }
        setEvents([...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[]), ...(data as EventTypes[])]);
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
    <div>
      {/* <EventPageHero
        categories={categories}
        categoryLoading={categoryLoading}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleFilterChange={() => {}}
        selectedCategory={null}
        selectedDate={null}
        selectedVenue={null}
      /> */}

      <div className="wrapper py-16">
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
                        <Link href={`/events/${category.category_slug}`} className={`block p-2 px-4 rounded-md transition duration-300 hover:text-blue-800 hover:bg-blue-100 whitespace-nowrap`}>
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

          <div className='flex-1 max-w-[90%]'>
            <div className=''>
              {/* Search bar */}
              <InputField
                type='text'
                placeholder='Search for events...'
                value={searchQuery}
              //   onChange={handleSearchChange}
              />
            </div>

            <div className="space-y-4">
              {
                Object.keys(eventsWithCategory).map((category, index) => (
                  <EventsCategory key={category} category={category} eventsWithCategory={eventsWithCategory} isEnd={index === Object.keys(eventsWithCategory).length - 1} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};