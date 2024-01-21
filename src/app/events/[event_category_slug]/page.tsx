"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import InputField from '@/components/InputField';
import { supabase } from '@/config/supabase';
import { EventCategory, EventTypes } from '../event.types';
import EventCard from '../EventCard';

export default function EventsPage({ params: { event_category_slug } }: { params: { event_category_slug: string } }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [events, setEvents] = useState<EventTypes[]>([]);
    const [categories, setCategories] = useState<EventCategory[]>([]);

    useEffect(() => {
        const initialEvents = async () => {
            try {
                let { data, error } = await supabase
                    .from('events')
                    .select('*')
                    .eq('event_category->>category_slug', event_category_slug)

                if (error) {
                    console.error('Error fetching events:', error);
                }

                if (data) {
                    setEvents(data);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
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
        };

        initialEvents();
        fetchCategories();
    }, [searchQuery, event_category_slug]);

    const fetchEvents = async () => {
        try {
            let { data, error } = await supabase
                .from('events')
                .select('*')
                .textSearch('event_name', `"${searchQuery}"`, { type: 'plain', config: 'english' })
                .eq('event_category->>category_slug', event_category_slug)

            if (error) {
                console.error('Error fetching events:', error);
            }

            if (data) {
                setEvents(data);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
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
                        onChange={handleSearchChange} // Use the debounced function here
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
