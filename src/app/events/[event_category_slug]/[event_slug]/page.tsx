import React from 'react';
import Image from 'next/image';
import TicketCard from './TicketCard';
import { EventTypes } from '../../event.types';
import { supabase } from '@/config/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 60 // revalidate at most every 1 minute

const fetchEvent: (event_category_slug: string, event_slug: string) => Promise<EventTypes> = async (event_category_slug: string, event_slug: string) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('event_category->>category_slug', event_category_slug)
            .eq('event_slug', event_slug)
            .single();

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
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-blue-50">
                    {event.event_image && (
                        <Image
                            src={event.event_image}
                            alt={event.event_name}
                            objectFit="cover"
                            layout="fill"
                        />
                    )}
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold">{event.event_name}</h1>
                    <p className="text-gray-700">{event.event_description.slice(0, 200)}</p>

                    <div>
                        <p className="text-gray-800">
                            <span className="font-bold">Date & Time:</span> {event.event_date} at {event.event_time}
                        </p>
                        <p className="text-gray-800">
                            <span className="font-bold">Venue:</span> {event.event_venue}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Ticket Types</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {event.tickets.map((ticket, index) => (
                        <TicketCard key={index} ticket={ticket} />
                    ))}
                </div>
            </div>

            <div className='w-2/3'>
                <h2 className="text-2xl font-bold">Event Details</h2>
                <p>{event.event_description}</p>
            </div>
        </div>
    );
};

export default EventDetailsPage;
