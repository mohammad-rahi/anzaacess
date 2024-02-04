"use client";

import { TicketTypes } from '@/app/events/event.types';
import { Button } from '@/components'
import { supabase } from '@/config/supabase';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiPencil, HiPlus } from 'react-icons/hi2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AddNewTicketModal from './AddNewTicketModal';
import EditTicketModal from './EditTicketModal';

export default function ProfileTicketsPage({ params: { username } }: { params: { username: string } }) {
    const [eventsLoading, setEventsLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<{ id: number; event_name: string }[]>([]);
    const [tickets, setTickets] = useState<TicketTypes[]>([]);
    const [eventToAddNewTicket, setEventToAddNewTicket] = useState<{ id: number; event_name: string } | null>(null);
    const [eventTicketToEdit, setEventTicketToEdit] = useState<{ event: { id: number; event_name: string }, ticketToUpdate: TicketTypes } | null>(null);

    const { user } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (eventToAddNewTicket || eventTicketToEdit) {
            document.body.classList.add('overflow-hidden');
        }
        else {
            document.body.classList.remove('overflow-hidden');
        }

    }, [eventToAddNewTicket, eventTicketToEdit]);

    // Fetch events and tickets
    useEffect(() => {
        const fetchEventsAndTickets = async () => {
            try {
                if (user?.id) {
                    const { data: eventsData, error: eventsError } = await supabase.from('events').select('id, event_name').eq('profile_id', user?.id);

                    if (eventsError) {
                        console.error('Error fetching events:', eventsError);
                    }

                    if (eventsData) {
                        setEvents(eventsData);

                        // Fetch tickets
                        const eventIds = eventsData.map((event) => event.id);
                        const { data: ticketsData, error: ticketsError } = await supabase
                            .from('event_tickets')
                            .select('*')
                            .in('event_id', eventIds);

                        if (ticketsError) {
                            console.error('Error fetching tickets:', ticketsError);
                        }

                        if (ticketsData) {
                            setTickets(ticketsData);
                        }
                    }

                    setEventsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching events and tickets:', error);
            }
        };

        fetchEventsAndTickets();
    }, [user, eventToAddNewTicket, eventTicketToEdit]);

    return (
        <div className='space-y-8'>
            <div className='flex items-center justify-between gap-8'>
                <h1 className='text-3xl font-bold'>Event Tickets</h1>
            </div>

            <div>
                {eventsLoading ? (
                    <div className='p-4 py-7 rounded-md shadow-sm mt-4 text-center'>
                        <p className='text-gray-500'>Fetching events and tickets...</p>
                        <Skeleton count={5} className='mt-4 py-7' baseColor='white' />
                    </div>
                ) : (
                    events.map((event) => (
                        <div key={event.id} className='bg-white p-4 rounded-md shadow-sm mt-4'>
                            <div className='flex items-center justify-between gap-8'>
                                <h2 className='text-lg font-bold'>{event.event_name}</h2>

                                <div className=''>
                                    <Button onClick={() => setEventToAddNewTicket(event)} size='sm'>
                                        <HiPlus className='w-4 h-4' />
                                        New
                                    </Button>
                                </div>
                            </div>

                            {tickets
                                .filter((ticket) => ticket.event_id === event.id)
                                .length === 0 ? (
                                <div className='text-gray-700 text-sm mt-4'>
                                    <p>No tickets found for this event.</p>
                                </div>
                            ) : (
                                <ul className='space-y-4 mt-4 grid grid-cols-3 gap-4'>
                                    {tickets
                                        .filter((ticket) => ticket.event_id === event.id)
                                        .map((ticket) => (
                                            <li
                                                key={ticket.id}
                                                className='text-sm flex items-center justify-between gap-8 group bg-blue-50 relative bg-gradient-to-r from-blue-200 to-blue-300 p-6 rounded-md shadow-md'
                                            >
                                                <div>
                                                    <p className='font-bold'>{ticket.name}</p>
                                                    <p className='text-sm text-gray-800'>{ticket.description}</p>
                                                    <p className="text-gray-800 text-sm">Price: ${ticket.price}</p>
                                                </div>

                                                <div className='group-hover:opacity-100opacity-0 pointer-events-nonegroup-hover:pointer-events-auto'>
                                                    <Button
                                                        variant='outline'
                                                        size='sm'
                                                        onClick={() => setEventTicketToEdit({ event, ticketToUpdate: ticket })}
                                                    >
                                                        <HiPencil className='w-5 h-5' />
                                                        Edit
                                                    </Button>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    ))
                )}
            </div>

            {
                eventToAddNewTicket && (
                    <AddNewTicketModal onClose={() => setEventToAddNewTicket(null)} event={eventToAddNewTicket} />
                )
            }

            {
                eventTicketToEdit && (
                    <EditTicketModal onClose={() => setEventTicketToEdit(null)} data={eventTicketToEdit} />
                )
            }
        </div>
    )
}
