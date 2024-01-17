import React from 'react';
import { EventTypes } from '../../event.types';
import Image from 'next/image';
import TicketCard from './TicketCard';
import { Button } from '@/components';

const events: EventTypes[] = [
    {
        id: '1',
        profile_id: 'user1',
        event_name: 'Event 1',
        event_slug: 'event-1',
        event_description: 'Description for Event 1',
        event_category: {
            id: '1',
            category_name: 'Category 1',
            category_slug: 'category-1',
        },
        event_image: 'image1.jpg',
        event_date_time: '2024-01-15T18:00:00',
        event_venue: 'Venue 1',
        tickets: [
            {
                id: '1',
                name: 'VIP',
                price: 100,
                description: 'Description for VIP',
            },
            {
                id: '2',
                name: 'Standard',
                price: 50,
                description: 'Description for Standard',
            }
        ]
    },
    {
        id: '2',
        profile_id: 'user2',
        event_name: 'Event 2',
        event_slug: 'event-2',
        event_description: 'Description for Event 2',
        event_category: {
            id: '2',
            category_name: 'Category 2',
            category_slug: 'category-2',
        },
        event_image: 'image2.jpg',
        event_date_time: '2024-01-15T18:00:00',
        event_venue: 'Venue 2',
        tickets: [
            {
                id: '1',
                name: 'VIP',
                price: 100,
                description: 'Description for VIP',
            },
            {
                id: '2',
                name: 'Standard',
                price: 50,
                description: 'Description for Standard',
            }
        ]
    },
    {
        id: '3',
        profile_id: 'user3',
        event_name: 'Event 3',
        event_slug: 'event-3',
        event_description: 'Description for Event 3',
        event_category: {
            id: '3',
            category_name: 'Category 3',
            category_slug: 'category-3',
        },
        event_image: 'image3.jpg',
        event_date_time: '2024-01-15T18:00:00',
        event_venue: 'Venue 3',
        tickets: [
            {
                id: '1',
                name: 'VIP',
                price: 100,
                description: 'Description for VIP',
            },
            {
                id: '2',
                name: 'Standard',
                price: 50,
                description: 'Description for Standard',
            }
        ]
    }
];

const EventDetailsPage = ({ params: { event_category_slug, event_slug } }: { params: { event_category_slug: string, event_slug: string } }) => {

    // Find the selected event based on event_category and event_slug
    const selectedEvent = events.find(
        (event) => event.event_category.category_slug === event_category_slug && event.event_slug === event_slug
    );

    // Handle if the event is not found
    if (!selectedEvent) {
        return <div>Event not found</div>;
    }

    const ticketTypes = selectedEvent.tickets[0].name.split(',');

    return (
        <main className="bg-blue-50">
            <div className='wrapper py-16 min-h-screen'>
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
                    <div className="mb-8 relative aspect-video overflow-hidden rounded-md bg-blue-50">
                        {
                            !selectedEvent.event_image && (
                                <Image
                                    src={`/images/${selectedEvent.event_image}`}
                                    alt={selectedEvent.event_name}
                                    fill />
                            )
                        }
                    </div>
                    <h2 className='text-3xl font-bold mb-4'>{selectedEvent.event_name}</h2>
                    <p className='text-gray-600 mb-4'>{selectedEvent.event_description}</p>
                    <p className='text-gray-800 mb-4'>
                        <span className='font-bold'>Date & Time:</span> {selectedEvent.event_date_time}
                    </p>
                    <p className='text-gray-800 mb-4'>
                        <span className='font-bold'>Venue:</span> {selectedEvent.event_venue}
                    </p>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-4">Ticket Types</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ticketTypes.map((type, index) => (
                                <TicketCard key={index} type={type} />
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
