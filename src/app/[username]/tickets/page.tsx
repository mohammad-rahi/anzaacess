"use client";

import { TicketTypes } from '@/app/events/event.types';
import { Button } from '@/components'
import { supabase } from '@/config/supabase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProfileTicketsPage({ params: { username } }: { params: { username: string } }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [tickets, setTickets] = useState<TicketTypes[]>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from('event_tickets').select('*');

            if (error) {
                console.error('Error fetching tickets:', error);
            }

            if (data) {
                setTickets(data);
            }

            setLoading(false);
        };

        fetchCategories();
    }, []);

    return (
        <div className='space-y-8'>
            <div className='flex items-center justify-between gap-8'>
                <h1 className='text-3xl font-bold'>Event Tickets</h1>

                <div>
                    <Button href={`/${username}/tickets/new`}>New</Button>
                </div>
            </div>

            <div>
                <ul className='space-y-4'>
                    {
                        loading ? (
                            <Skeleton count={5} className='p-4 py-7 rounded-md shadow-sm mt-4' baseColor='white' />
                        ) : (
                            tickets.length > 0 ? (
                                tickets.map((ticket) => (
                                    <li key={ticket.id} className='bg-white p-4 rounded-md shadow-sm overflow-hidden flex items-center justify-between gap-8 group'>
                                        <span className='font-bold'>{ticket.name}</span>

                                        <div className='group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto'>
                                            <Button variant='outline' href={`/${username}/tickets/edit/${ticket.event_id}/${ticket.id}`}>Edit</Button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <div className='flex items-center justify-center text-sm text-gray-700 py-16'>
                                    <p>No tickets found.</p>
                                </div>
                            )
                        )
                    }
                </ul>
            </div>
        </div>
    )
}
