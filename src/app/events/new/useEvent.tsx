"use client";

import { useAuthContext } from '@/contexts/AuthContext';
import { useEventContext } from '@/contexts/EventContext';
import React, { useState } from 'react';
import { EventTypes } from '../event.types';
import { supabase } from '@/config/supabase';

const eventCategories = [
    {
        value: 'concerts',
        label: 'Concerts'
    },
    {
        value: 'sports-events',
        label: 'Sports Events'
    },
    {
        value: 'theater-performances',
        label: 'Theater Performances'
    },
    {
        value: 'festivals',
        label: 'Festivals'
    },
    {
        value: "conferences",
        label: "Conferences"
    },
    {
        value: "comedy-shows",
        label: "Comedy Shows"
    },
    {
        value: "exhibitions",
        label: "Exhibitions"
    },
    {
        value: "workshops",
        label: "Workshops"
    },
    {
        value: "film-screenings",
        label: "Film Screenings"
    },
    {
        value: "charity-events",
        label: "Charity Events"
    },
    {
        value: "art-galleries",
        label: "Art Galleries"
    },
    {
        value: "networking-events",
        label: "Networking Events"
    },
    {
        value: "food-and-drink-tastings",
        label: "Food and Drink Tastings"
    },
    {
        value: "fashion-shows",
        label: "Fashion Shows"
    },
    {
        value: "educational-seminars",
        label: "Educational Seminars"
    }
]

export default function useEvent() {
    const [step, setStep] = useState(1);
    const [eventImageUploadLoading, setEventImageUploadLoading] = useState(false);

    const steps = ['Details', 'Date', 'Tickets', 'Image'];

    // Function to handle next step
    const handleNextStep = () => {
        if (step < 4) {
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
        tickets
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
                    tickets
                };

                const { data, error } = await supabase.from("events").insert(event);

                if (error) {
                    throw error;
                }
                else {
                    setStep(1);
                    setEventName('');
                    setEventDescription('');
                    setEventCategory({
                        category_name: '',
                        category_slug: '',
                    });
                    setEventDateTime('');
                    setEventVenue('');
                    setTicketTypes([]);
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
        eventImageUploadLoading,
        step,
        steps,
        handlePrevStep,
        handleNextStep,
        handleStepClick
    }
}
