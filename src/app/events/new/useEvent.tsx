"use client";

import { useAuthContext } from '@/contexts/AuthContext';
import { useEventContext } from '@/contexts/EventContext';
import React, { useEffect, useState } from 'react';
import { EventCategory, EventTypes } from '../event.types';
import { supabase } from '@/config/supabase';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function useEvent() {
    const [step, setStep] = useState(1);
    const [eventImageUploadLoading, setEventImageUploadLoading] = useState(false);
    const [createEventLoading, setCreateEventLoading] = useState(false);

    const [eventCategories, setEventCategories] = useState<{ value: string; label: string }[]>([]);

    const [imageStoragePath, setImageStoragePath] = useState<string>();

    const router = useRouter();

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

    const steps = ['Details', 'Date', 'Venue', 'Image'];

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
        status,
    }, setEventName, setEventDescription, setEventDate, setEventTime, setEventVenue, setVenueDescription, setEventCategory, setEventImage } = useEventContext();

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

    const deleteImage = async (path: string) => {
        try {
            const { error } = await supabase.storage.from('event-images').remove([path]);

            if (error) {
                console.error('Error deleting image:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error deleting image:', error);
            return false;
        }
    };

    const handleRemoveImage = async (editImagePath?: string) => {
        if (editImagePath) {
            setEventImageUploadLoading(true);

            try {
                const isDeleted = await deleteImage(editImagePath);

                if (isDeleted) {
                    setEventImage('');
                    setEventImageUploadLoading(false);
                } else {
                    // Handle deletion failure
                    setEventImageUploadLoading(false);
                    console.error('Failed to delete the image.');
                }
            } catch (error) {
                console.error('Error extracting path or deleting image:', error);
                setEventImageUploadLoading(false);
            }
        }
        else if (imageStoragePath) {
            setEventImageUploadLoading(true);

            try {
                const isDeleted = await deleteImage(imageStoragePath);

                if (isDeleted) {
                    setEventImage('');
                    setEventImageUploadLoading(false);
                } else {
                    // Handle deletion failure
                    setEventImageUploadLoading(false);
                    console.error('Failed to delete the image.');
                }
            } catch (error) {
                console.error('Error extracting path or deleting image:', error);
                setEventImageUploadLoading(false);
            }
        }
    };

    const handleEventImageChange = async (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (ev.target as HTMLInputElement).files;

        if (files) {
            const eventImage = files[0];

            if (eventImage) {
                const previewURL = URL.createObjectURL(eventImage);
                setEventImage(previewURL);
                setEventImageUploadLoading(true);

                const imageUrl = await uploadFile(eventImage);
                setImageStoragePath(imageUrl || "");

                if (!imageUrl) {
                    // Handle upload failure
                    setEventImageUploadLoading(false);
                    console.error('Failed to upload the image.');
                }
            }
        }
    }

    // Function to handle form submission
    const handleAddEvent = async (eventId?: number, onClose?: () => void) => {
        try {
            if (user?.id) {
                setCreateEventLoading(true);

                const event: EventTypes = {
                    profile_id: user.id,
                    event_name,
                    event_slug,
                    event_description,
                    event_category: {
                        category_name: event_category.category_name,
                        category_slug: event_category.category_slug
                    },
                    event_image: imageStoragePath || event_image,
                    event_date,
                    event_time,
                    event_venue,
                    venue_description,
                    status
                };


                if (event.event_name && event.event_description && event.event_date && event.event_time && event.event_venue) {
                    if (eventId) {
                        const { data, error } = await supabase.from("events").update(event).eq("id", eventId);

                        if (error) {
                            setCreateEventLoading(false);
                            throw error;
                        }

                        setCreateEventLoading(false);

                        // setStep(1);
                        // setEventName('');
                        // setEventDescription('');
                        // setEventCategory({
                        //     category_name: '',
                        //     category_slug: '',
                        // });
                        // setEventDate('');
                        // setEventTime('');
                        // setEventVenue('');
                        // setVenueDescription('');

                        // setImageStoragePath('');
                        // setEventImage('');

                        alert('Event updated successfully!');

                        if (onClose) {
                            onClose();
                        }
                        else {
                            router.back();
                        }
                    }
                    else {
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

                            setImageStoragePath('');
                            setEventImage('');

                            alert('Event created successfully!');
                        }
                    }
                }
                else {
                    setCreateEventLoading(false);
                    alert('Please fill all fields');
                }
            }
        } catch (error: any) {
            console.error(`Error creating/updating event: ${error.message}`);
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
        createEventLoading,
        handleRemoveImage
    }
}
