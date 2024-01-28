"use client";

import React, { useEffect, useState } from 'react';
import InputField from '@/components/InputField';
import { FaChevronLeft, FaTicketAlt } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { v4 as uuid4 } from 'uuid';
import { EventTypes, TicketTypes } from '@/app/events/event.types';
import { Button } from '@/components';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabase';
import { useAuthContext } from '@/contexts/AuthContext';
import { BarLoader } from 'react-spinners';

const KesIcon = () => (
    <p className='text-gray-400 font-medium text-xs pr-1'>KSH</p>
);

export default function ProfileNewTicketPage() {
    const [tickets, setTickets] = useState<TicketTypes[]>([]);
    const [eventID, setEventID] = useState<number | null>(null);
    const [events, setEvents] = useState<EventTypes[]>([]);
    const [ticketsSubmitLoading, setTicketSubmitLoading] = useState<boolean>(false);

    const { user } = useAuthContext();

    // Function to handle adding a new ticket
    const handleAddTicket = () => {
        setTickets([...tickets, { event_id: eventID || 0, profile_id: user?.id || 0, name: '', price: 0, description: '', quantity_available: 0, }]);
    };

    const handleRemoveTicket = (indexToRemove: number) => {
        setTickets(tickets.filter((_, index) => index !== indexToRemove));
    };

    // Function to update ticket details
    const handleTicketChange = (index: number, field: string, value: string) => {
        const updatedTickets = [...tickets];
        (updatedTickets[index] as any)[field] = value;
        setTickets(updatedTickets);
    };

    const router = useRouter();

    useEffect(() => {
        const fetchEvents = async () => {
            const { data, error } = await supabase.from('events').select('*').eq('profile_id', user?.id);

            if (error) {
                console.error('Error fetching events:', error);
            }

            if (data) {
                setEvents(data);
            }
        }

        fetchEvents();
    }, [user]);

    const handleSubmitTicket = async () => {

        try {
            setTicketSubmitLoading(true);

            if (eventID && user?.id) {
                if (tickets.length > 0) {

                    const allTickets = tickets.map((ticket) => {
                        const { event_id, id, profile_id, ...restTicket } = ticket;

                        return {
                            ...restTicket,
                            event_id: eventID,
                            profile_id: user?.id
                        }
                    });

                    const { error } = await supabase.from('event_tickets').insert(allTickets);
                    if (error) {
                        console.error('Error creating ticket:', error);
                        return;
                    }
                    alert('Ticket created successfully');
                    router.push(`/${user?.username}/tickets`);
                }
                else {
                    alert('Please add tickets');
                }
            }
            else {
                alert('Please select an event');
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
        finally {
            setTicketSubmitLoading(false);
        }
    }

    return (
        <div className='space-y-12'>
            <div className='flex items-center'>
                <button title='Go back' className='p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300' onClick={() => router.back()}>
                    <FaChevronLeft />
                </button>

                <div className='flex-1 text-center'>
                    <h1 className="text-4xl font-bold text-center text-blue-600">Create Event Tickets</h1>
                </div>
            </div>
            <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg space-y-8">
                <div>
                    <InputField
                        type='select'
                        label='Select Event'
                        placeholder='Select Event'
                        options={events.map((event) => ({
                            label: event.event_name,
                            value: event.id
                        } as unknown as { label: string; value: string }))}
                        setSelectChange={(opt) => setEventID(parseInt(opt.value))}
                    />

                    {tickets.map((ticket, index) => (
                        <fieldset key={index} className='border rounded-md p-2 mb-4'>
                            <legend className='font-bold text-sm'>Ticket {index + 1}</legend>
                            <div className='mb-2'>
                                <InputField
                                    type="text"
                                    label='Name'
                                    placeholder='VIP, Regular, Friends, Family, etc.'
                                    value={ticket.name}
                                    onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                                    inputLeft={<FaTicketAlt className="text-gray-500" />}
                                />
                            </div>

                            <div className='mb-2 flex items-center gap-6'>
                                <InputField
                                    type="number"
                                    label='Price'
                                    placeholder='Enter Ticket Price'
                                    value={ticket.price}
                                    onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                                    inputLeft={<KesIcon />}
                                />

                                <InputField
                                    type="number"
                                    label='Quantity Available'
                                    placeholder='Enter Ticket Quantity'
                                    value={ticket.quantity_available}
                                    onChange={(e) => handleTicketChange(index, 'quantity_available', e.target.value)}
                                />
                            </div>

                            <div className='mb-2'>
                                <InputField
                                    label='Description'
                                    placeholder='Enter Ticket Description...'
                                    value={ticket.description}
                                    onChange={(e) => handleTicketChange(index, 'description', e.target.value)}
                                    inputLeft={<FaNoteSticky className="text-gray-500" />}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveTicket(index)}
                                className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
                            >
                                Remove Ticket
                            </button>
                        </fieldset>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddTicket}
                        className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                        Add Ticket
                    </button>
                </div>

                <div className='flex items-center justify-center'>
                    <Button onClick={handleSubmitTicket} disabled={ticketsSubmitLoading}>
                        {
                            ticketsSubmitLoading ? <BarLoader color='white' /> : " Create Ticket"
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}
