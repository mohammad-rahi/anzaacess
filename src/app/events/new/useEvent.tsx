"use client";

import { useAuthContext } from '@/contexts/AuthContext';
import { useEventContext } from '@/contexts/EventContext';
import React, { useState } from 'react';
import { EventTypes } from '../event.types';
import { supabase } from '@/config/supabase';

const eventCategories = [
    {
        value: 'Concerts',
        label: 'Concerts'
    },
    {
        value: 'Sports Events',
        label: 'Sports Events'
    },
    {
        value: 'Theater Performances',
        label: 'Theater Performances'
    },
    {
        value: 'Festivals',
        label: 'Festivals'
    },
    {
        value: "Conferences",
        label: "Conferences"
    },
    {
        value: "Comedy Shows",
        label: "Comedy Shows"
    },
    {
        value: "Exhibitions",
        label: "Exhibitions"
    },
    {
        value: "Workshops",
        label: "Workshops"
    },
    {
        value: "Film Screenings",
        label: "Film Screenings"
    },
    {
        value: "Charity Events",
        label: "Charity Events"
    },
    {
        value: "Art Galleries",
        label: "Art Galleries"
    },
    {
        value: "Networking Events",
        label: "Networking Events"
    },
    {
        value: "Food and Drink Tastings",
        label: "Food and Drink Tastings"
    },
    {
        value: "Fashion Shows",
        label: "Fashion Shows"
    },
    {
        value: "Educational Seminars",
        label: "Educational Seminars"
    }
]

export default function useEvent() {
    const [step, setStep] = useState(1);
    const [eventImageUploadLoading, setEventImageUploadLoading] = useState(false);

    const steps = ['Event Name', 'Date, Time, Venue', 'Ticket Types'];

    // Function to handle next step
    const handleNextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
    };

    // Function to handle previous step
    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleStepClick = (clickedStep: number) => {
        setStep(clickedStep);
    };

    const { user } = useAuthContext();

    const { state: {
        event_name,
        event_slug,
        event_description,
        event_category,
        event_image,
        event_date_time,
        event_venue,
        ticket_types
    }, setEventName, setEventDescription, setEventDateTime, setEventVenue, setTicketTypes, setEventCategory, setEventImage } = useEventContext();

    const handleEventImageChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (ev.target as HTMLInputElement).files;

        if (files) {
            const eventImage = files[0];

            if (eventImage) {
                const previewURL = URL.createObjectURL(eventImage);
                setEventImage(previewURL);
                setEventImageUploadLoading(true);

                
            }
        }
    }

    // Function to handle form submission
    const handleAddEvent = async () => {
        try {
            if (user?.id) {
                const event: EventTypes = {
                    profile_id: user.id,
                    event_name,
                    event_slug,
                    event_description,
                    event_category,
                    event_image,
                    event_date_time,
                    event_venue,
                    ticket_types
                };

                const { data, error } = await supabase.from("events").insert(event);

                if (error) {
                    throw error;
                }
                else {
                    setStep(1);
                    setEventName('');
                    setEventDescription('');
                    setEventCategory('');
                    setEventDateTime('');
                    setEventVenue('');
                    setTicketTypes('');
                }
            }
        } catch (error) {
            console.error({ error })
        }
    };

    return {
        eventCategories,
        handleEventImageChange,
        handleAddEvent,
        eventImageUploadLoading
    }
}
