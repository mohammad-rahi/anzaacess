import React from 'react';
import Image from 'next/image';
import TicketCard from './TicketCard';
import { EventTypes, TicketTypes } from '../../event.types';
import { notFound } from 'next/navigation';
import EventCardLists from '../../EventCardLists';
import { supabase, supabaseServer } from '@/config/supabase';
import { cookies } from 'next/headers';
import EventDetailsHero from './EventDetailsHero';

export const revalidate = 0;

const fetchEvent: (event_category_slug: string, event_slug: string) => Promise<EventTypes | null> = async (event_category_slug: string, event_slug: string) => {
    try {
        const { data, error } = await supabase
            .from('events')
            .select('*')
            .eq('event_category->>category_slug', event_category_slug)
            .eq('event_slug', event_slug)
            .eq('status', 'published')
            .single();

        if (error) {
            throw error;
        }

        if (data) {
            return data;
        } else {
            // Log a message to indicate that the event was not found
            console.log(`Event not found for ${event_category_slug}/${event_slug}`);
            return null;
        }
    } catch (error: any) {
        console.error(error);
        return null;
    }
};

const fetchTickets: (event_id: number) => Promise<TicketTypes[]> = async (event_id: number) => {
    try {
        if (event_id) {
            const { data, error } = await supabaseServer({ cookies })
                .from('event_tickets')
                .select('*')
                .eq('event_id', event_id);
 
            if (error) {
                throw error;
            }

            if (data) {
                return data as TicketTypes[]
            }
            else {
                return [];
            }
        }
        else {
            return [];
        }
    } catch (error) {
        console.log(`Error fetching tickets: ${error}`);
        return [];
    }
}

const fetchRelatedEvent: (event_category_slug: string, event_slug: string) => Promise<EventTypes[]> = async (event_category_slug: string, event_slug: string) => {
    try {
        const { data, error } = await supabaseServer({ cookies })
            .from('events')
            .select('*')
            .eq('event_category->>category_slug', event_category_slug)
            .neq('event_slug', event_slug)
            .eq('status', 'published');

        if (error) {
            throw new Error(error.message);
        }

        if (data) {
            return data;
        } else {
            return []
        }
    } catch (error) {
        console.log(error);
        return []
    }
}

const EventDetailsPage = async ({ params: { event_category_slug, event_slug } }: { params: { event_category_slug: string, event_slug: string } }) => {
    const event = await fetchEvent(event_category_slug, event_slug);

    if (!event) {
        notFound();
    }


    const tickets: TicketTypes[] = await fetchTickets(event.id || 0);
    const releatedEvents = await fetchRelatedEvent(event_category_slug, event_slug);

    return (
        <div>
            <EventDetailsHero event_image={event.event_image} event_name={event.event_name} />

            <section className="py-16 bg-blue-100">
                <div className="wrapper">
                    <h2 className="text-3xl font-bold mb-8">Event Highlights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Use the same image source as in EventDetailsHero */}
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden">
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
                </div>
            </section>

            <section className="py-16 bg-blue-50">
                <div className="wrapper">
                    <h2 className="text-3xl font-bold mb-8">Ticket Types</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tickets.map((ticket, index) => (
                            <TicketCard key={index} event={event} ticket={ticket} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-blue-100">
                <div className="wrapper">
                    <h2 className="text-3xl font-bold mb-8">Event Details</h2>
                    <div className="w-2/3">
                        <p>{event.event_description}</p>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-blue-50">
                <div className="wrapper">
                    <h2 className="text-3xl font-bold mb-8">Related Events</h2>
                    {releatedEvents.length > 0 && (
                        <div className="space-y-4">
                            <EventCardLists events={releatedEvents} />
                        </div>
                    )}
                </div>
            </section>
        </div>

    );
};

export default EventDetailsPage;
