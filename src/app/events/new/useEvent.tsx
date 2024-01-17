"use client";

import { useAuthContext } from '@/contexts/AuthContext';
import { useEventContext } from '@/contexts/EventContext';
import React, { useEffect, useState } from 'react';
import { EventCategory, EventTypes } from '../event.types';
import { supabase } from '@/config/supabase';
import { v4 as uuidv4 } from 'uuid';

export default function useEvent() {
    const [step, setStep] = useState(1);
    const [eventImageUploadLoading, setEventImageUploadLoading] = useState(false);
    const [createEventLoading, setCreateEventLoading] = useState(false);

    const [eventCategories, setEventCategories] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        const fetchEventCategories = async () => {
            try {
                const { data, error } = await supabase.from('event_categories').select('*');

                if (error) {
                    console.error('Error fetching event categories:', error);
                    return;
                }

                if (data) {
                    setEventCategories(data.map((category: EventCategory) => ({
                        value: category.category_slug,
                        label: category.category_name,
                    })))
                }
            } catch (error) {
                console.error('Error fetching event categories:', error);
            }
        };

        fetchEventCategories();
    }, []);

    const steps = ['Details', 'Date', 'Venue', 'Tickets', 'Image'];

    // Function to handle next step
    const handleNextStep = () => {
        if (step < 5) {
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
        event_date,
        event_time,
        event_venue,
        venue_description,
        tickets
    }, setEventName, setEventDescription, setEventDate, setEventTime, setEventVenue, setVenueDescription, setTickets, setEventCategory, setEventImage } = useEventContext();

    const uploadFile = async (file: File) => {
        const { data, error } = await supabase.storage.from('event-images').upload(`event-images/${file.name}-${uuidv4()}`, file);

        if (error) {
            console.log(error);
            setEventImageUploadLoading(false);
            return;
        }
        else if (data) {
            setEventImageUploadLoading(false);
            const { data: { publicUrl } } = supabase.storage.from('event-images').getPublicUrl(data.path);
            return publicUrl;
        }
    }

    const handleEventImageChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (ev.target as HTMLInputElement).files;

        if (files) {
            const eventImage = files[0];

            if (eventImage) {
                const previewURL = URL.createObjectURL(eventImage);
                setEventImage(previewURL);
                setEventImageUploadLoading(true);

                uploadFile(eventImage);
            }
        }
    }

    // Function to handle form submission
    const handleAddEvent = async () => {
        try {
            if (user?.id) {
                setCreateEventLoading(true);

                const event: EventTypes = {
                    profile_id: user.id,
                    event_name,
                    event_slug,
                    event_description,
                    event_category,
                    event_image,
                    event_date,
                    event_time,
                    event_venue,
                    venue_description,
                    tickets
                };

                const { data, error } = await supabase.from("events").insert(event);

                if (error) {
                    setCreateEventLoading(false);
                    throw error;
                }
                else {
                    setCreateEventLoading(false);

                    setStep(1);
                    setEventName('');
                    setEventDescription('');
                    setEventCategory({
                        category_name: '',
                        category_slug: '',
                    });
                    setEventDate('');
                    setEventTime('');
                    setEventVenue('');
                    setVenueDescription('');
                    setTickets([]);

                    alert('Event created successfully!');
                }
            }

            console.log({ event_name, event_slug, event_description, event_category, event_image, event_date, event_time, event_venue, venue_description, tickets })
        } catch (error) {
            console.error({ error });
            setCreateEventLoading(false);
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
        handleStepClick,
        setEventImageUploadLoading,
        uploadFile,
        createEventLoading
    }
}
