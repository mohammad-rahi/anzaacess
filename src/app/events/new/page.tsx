"use client";

import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { useEventContext } from '@/contexts/EventContext';
import { useState } from 'react';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaStickyNote, FaImages, FaTimes } from 'react-icons/fa';
import { supabase } from '@/config/supabase';
import { EventTypes } from '../event.types';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function AddEvents() {
    const { user } = useAuth();

    const [step, setStep] = useState(1);
    const { state: {
        event_name,
        event_description,
        event_category,
        event_image,
        event_date_time,
        event_venue,
        ticket_types
    }, setEventName, setEventDescription, setEventDateTime, setEventVenue, setTicketTypes, setEventCategory, setEventImage } = useEventContext();

    const steps = ['Event Name', 'Date, Time, Venue', 'Ticket Types'];

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

    const handleEventImageChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (ev.target as HTMLInputElement).files;

        if (files) {
            const eventImage = files[0];

            if (eventImage) {
                const previewURL = URL.createObjectURL(eventImage);
                setEventImage(previewURL);
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

    return (
        <main className="bg-blue-50 min-h-screen">
            <div className='wrapper py-24'>

                <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Create New Event</h1>

                    {/* Step Indicator as Tabs */}
                    {/* <ul className="mb-6 flex items-center justify-center space-x-4">
                        {steps.map((stepName, index) => (
                            <li
                                key={index}
                                onClick={() => handleStepClick(index + 1)}
                                className={`cursor-pointer flex items-center p-3 rounded-full text-sm ${step === index + 1
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                    : 'bg-white text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <span>{index + 1}</span>
                                <span className="ml-2">{stepName}</span>
                            </li>
                        ))}
                    </ul> */}

                    {/* Form Content */}
                    <form className="space-y-6" onSubmit={(ev) => ev.preventDefault()}>
                        <div>
                            <InputField
                                type="text"
                                value={event_name}
                                onChange={(e) => setEventName(e.target.value)}
                                placeholder="Enter event name"
                                label='Event Name'
                                inputLeft={<FaTicketAlt className="text-gray-500" />}
                            />

                            <InputField
                                value={event_description}
                                onChange={(e) => setEventDescription(e.target.value)}
                                placeholder="Enter event description..."
                                label='Description'
                                inputLeft={<FaStickyNote className="text-gray-500" />}
                            />

                            <div>
                                <InputField
                                    type="select"
                                    value={event_category}
                                    setSelectChange={(value) => setEventCategory(value)}
                                    label='Select Event Category'
                                    placeholder='Select Event Category'
                                    options={eventCategories}
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <InputField
                                type="datetime-local"
                                value={event_date_time}
                                onChange={(e) => setEventDateTime(e.target.value)}
                                placeholder="Enter event date and time"
                                label='Event Date and Time'
                                inputLeft={<FaCalendarAlt className="text-gray-500" />}
                            />

                            <InputField
                                type="text"
                                value={event_venue}
                                onChange={(e) => setEventVenue(e.target.value)}
                                placeholder="Enter event venue"
                                label='Event Venue'
                                inputLeft={<FaMapMarkerAlt className="text-gray-500" />}
                            />
                        </div>

                        <div>
                            <InputField
                                type="select"
                                value={ticket_types}
                                setSelectChange={(value) => setTicketTypes(value)}
                                label='Select Ticket Types'
                                placeholder='Select Ticket Type'
                                options={[
                                    {
                                        value: "VIP",
                                        label: "VIP"
                                    },
                                    {
                                        value: "General",
                                        label: "General"
                                    }
                                ]}
                            />

                            <div>
                                <InputField
                                    type="file"
                                    label='Upload Event Image'
                                    inputLeft={<FaImages className="text-gray-500" />}
                                    onChange={handleEventImageChange}
                                    placeholder='Upload Event Image'
                                />


                                {
                                    event_image && (
                                        <div className='relative aspect-video w-full rounded-md overflow-hidden border text-sm'>
                                            <Image src={event_image} alt="Event Image Preview" fill objectFit='cover' />

                                            {/* Here will be loading and remove button */}
                                            <button title='Remove' onClick={() => setEventImage('')} className="absolute top-2 right-2 bg-white/60 hover:bg-white/80 flex items-center justify-center p-1 rounded-full overflow-hidden cursor-pointer">
                                                <FaTimes />
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            {/* <div>
                                {step > 1 && (
                                    <Button onClick={handlePrevStep}>Previous</Button>
                                )}
                            </div>
                            {step < 4 && (
                                <div className='flex items-center justify-center'>
                                    <Button onClick={handleNextStep}>Next</Button>
                                </div>
                            )} */}

                            <div className='flex items-center justify-center'>
                                <Button onClick={handleAddEvent}>
                                    Create Event
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
