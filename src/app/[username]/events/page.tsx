"use client";

import { EventTypes } from '@/app/events/event.types';
import { Button } from '@/components';
import { supabase } from '@/config/supabase';
import { useAuthContext } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProfileEventsPage = () => {
    const [events, setEvents] = useState<EventTypes[]>([]);
    const [eventsLoading, setEventsLoading] = useState<boolean>(true);
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.from('events').select('*').eq('profile_id', user?.id);

            if (error) {
                console.error('Error fetching events:', error);
            }

            if (data) {
                setEvents(data);
            }

            setEventsLoading(false);
        };

        fetchEvents();
    }, [user]);


    return (
        <div className='space-y-8'>
            <div className='flex items-center justify-between gap-8'>
                <h1 className='text-3xl font-bold'>Events</h1>
            </div>

            <div>
                <ul className='space-y-4'>
                    {
                        eventsLoading ? (
                            <Skeleton count={5} className='p-4 py-7 rounded-md shadow-sm mt-4' baseColor='white' />
                        ) : (
                            events.length > 0 ? (
                                events.map((event) => (
                                    <li key={event.id} className='bg-white p-4 rounded-md shadow-sm overflow-hidden flex items-center justify-between gap-8 group'>
                                        <span className='font-bold'>{event.event_name}</span>

                                        <div className='group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto flex items-center gap-4'>
                                            <Button variant='outline' href={`/events/${event.event_category.category_slug}/${event.event_slug}`}>View</Button>
                                            <Button variant='outline' href={`/events/edit/${event.event_slug}`}>Edit</Button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className='flex items-center justify-center text-sm text-gray-700 py-16'>
                                    <p>No events found.</p>
                                </div>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProfileEventsPage