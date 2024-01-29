"use client";

import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { supabase } from '@/config/supabase';
import ProfileEditTicketForm from './ProfileEditTicketForm';
import GoBack from '@/components/GoBack';
import { useAuthContext } from '@/contexts/AuthContext';
import { EventTypes, TicketTypes } from '@/app/events/event.types';

const fetchTicket = async (ticket_id: number, event_id: number, profile_id: number) => {
    try {
        if (ticket_id && event_id && profile_id) {
            const { data, error } = await supabase.from('event_tickets').select('*').eq('id', ticket_id).eq('event_id', event_id).eq('profile_id', profile_id).single();

            if (error) {
                console.error('Error fetching ticket:', error);
            }

            if (!data) {
                notFound(); // Redirect to 404 page if ticket is not found
            }

            return data;
        }
    } catch (error) {
        console.error('Error fetching ticket:', error);
    }
}

const fetchEvent = async (profile_id: number, event_id: number) => {
    try {
        if (profile_id && event_id) {
            const { data, error } = await supabase.from('events').select('id, event_name').eq('profile_id', profile_id).eq('id', event_id).eq('status', 'published').single();

            if (error) {
                console.error('Error fetching events:', error);
            }

            if (!data) {
                notFound();
            }

            return data;
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

const fetchUserProfile = async (user_id: string) => {
    try {
        if (user_id) {
            const { data, error } = await supabase.from('profiles').select('id').eq('user_id', user_id).single();

            if (error) {
                console.error('Error fetching user profile:', error);
            }

            if (!data) {
                notFound();
            }

            return data;
        }
    }
    catch (error) {
        console.error('Error fetching user profile:', error);
    }
}

export default function ProfileEditTicketPage({
    params: {
        username, event_id, ticket_id
    } }: {
        params: { username: number, event_id: number, ticket_id: number }
    }) {
    const { user } = useAuthContext();

    const [event, setEvent] = useState<{ id: any; event_name: any; } | undefined | null>(null);
    const [ticket, setTicket] = useState<TicketTypes | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const [getTicket, getEvent] = await Promise.all([
                    fetchTicket(ticket_id, event_id, user?.id || 0),
                    fetchEvent(user?.id || 0, event_id),
                ]);

                setEvent(getEvent);
                setTicket(getTicket);
            }
        }

        fetchData();
    }, [user, event_id, ticket_id]);

    return (
        <div className='space-y-12'>
            <div className='flex items-center'>
                <GoBack />

                <div className='flex-1 text-center'>
                    <h1 className="text-4xl font-bold text-center text-blue-600">Edit Ticket</h1>
                </div>
            </div>

            {
                (event && ticket) && (
                    <ProfileEditTicketForm event={event} getTicket={ticket} />
                )
            }
        </div>
    )
}
