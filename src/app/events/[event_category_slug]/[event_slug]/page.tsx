import React from 'react';
import { EventTypes } from '../../event.types';
import Image from 'next/image';
import TicketCard from './TicketCard';
import { Button } from '@/components';
import { supabase } from '@/config/supabase';
import { notFound } from 'next/navigation';

const fetchEvent: (event_category_slug: string, event_slug: string) => Promise<EventTypes> = async (event_category_slug: string, event_slug: string) => {
    try {
        const { data, error } = await supabase.from('events').select('*').eq('event_category->>category_slug', event_category_slug).eq('event_slug', event_slug).single();

        if (error) {
            throw new Error(error.message);
        }

        if (data) {
            return data;
        }

    } catch (error) {
        console.log(error);
    }
}

const EventDetailsPage = async ({ params: { event_category_slug, event_slug } }: { params: { event_category_slug: string, event_slug: string } }) => {
    const event = await fetchEvent(event_category_slug, event_slug);

    if (!event) {
        notFound();
    }

    return (
        <main className="bg-blue-50">
            <div className='wrapper py-16 min-h-screen'>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
                    <div className="mb-8 relative aspect-w-16 aspect-h-9 overflow-hidden rounded-md bg-blue-50">
                        {
                            event.event_image && (
                                <Image
                                    src={event.event_image}
                                    alt={event.event_name}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            )
                        }
                    </div>
                    <h2 className='text-3xl font-bold mb-4'>{event.event_name}</h2>
                    <p className='text-gray-600 mb-4'>{event.event_description}</p>
                    <p className='text-gray-800 mb-4'>
                        <span className='font-bold'>Date & Time:</span> {event.event_date} at {event.event_time}
                    </p>
                    <p className='text-gray-800 mb-4'>
                        <span className='font-bold'>Venue:</span> {event.event_venue}
                    </p>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4">Ticket Types</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {event.tickets.map((ticket, index) => (
                                <TicketCard key={index} ticket={ticket} />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button>
                            Buy Tickets
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EventDetailsPage;
