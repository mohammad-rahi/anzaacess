"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import InputField from '@/components/InputField';
import { supabase } from '@/config/supabase';
import { EventCategory, EventTypes } from '../event.types';
import EventCard from '../EventCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import MobileCategories from '../MobileCategories';
import EventCardLists from '../EventCardLists';

export default function EventsPage({ params: { event_category_slug } }: { params: { event_category_slug: string } }) {
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
    }, [searchQuery, event_category_slug]);

    const fetchEvents = async () => {
        try {
            let { data, error } = await supabase
                .from('events')
                .select('*')
                .textSearch('event_name', `"${searchQuery}"`, { type: 'plain', config: 'english' })
                .eq('event_category->>category_slug', event_category_slug)
                .eq('status', 'published');

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
                                        <Link href={`/events/${category.category_slug}`} className={`block p-2 px-4 rounded-md transition duration-300 hover:text-blue-800 hover:bg-blue-100 ${category.category_slug === event_category_slug ? 'bg-blue-100 text-blue-800' : ''}`}>
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
                        event_category_slug={event_category_slug}
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

                <EventCardLists
                    events={events}
                    eventLoading={eventLoading}
                />
            </div>
        </div>
    )
}
