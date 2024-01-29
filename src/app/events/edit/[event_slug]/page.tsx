"use client";

import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { useEventContext } from '@/contexts/EventContext';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaStickyNote } from 'react-icons/fa';
import { FaNoteSticky } from 'react-icons/fa6';
import { BarLoader } from 'react-spinners';
import useEvent from '../../new/useEvent';
import EventImage from '../../new/EventImage';
import { useEffect } from 'react';
import { supabase } from '@/config/supabase';
import { EventCategory } from '../../event.types';
import PrivateRoute from '@/app/PrivateRoute';

export default function EditEvents({ params: { event_slug } }: { params: { event_slug: string } }) {
    const { state: {
        id: eventID,
        event_name,
        event_description,
        event_category,
        event_image,
        event_date,
        event_time,
        event_venue,
        venue_description,
    }, setEventName, setEventDescription, setEventDate, setEventTime, setEventVenue, setVenueDescription, setEventCategory, setEventImage, setEventToEdit } = useEventContext();

    const { eventCategories, handleEventImageChange, handleAddEvent, eventImageUploadLoading, step, handleNextStep, handlePrevStep, handleStepClick, steps, setEventImageUploadLoading, uploadFile, createEventLoading, handleRemoveImage } = useEvent();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data, error } = await supabase.from('events').select('*').eq('event_slug', event_slug).single();

                if (error) {
                    console.error('Error fetching event:', error);
                    return;
                }

                if (data) {
                    setEventToEdit(data);
                }

            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [event_slug])

    return (
        <PrivateRoute>
            <div className="bg-blue-100 min-h-[650px] rounded-md py-12 mb-28 space-y-8">
                <h1 className="text-4xl font-bold text-center text-blue-600">Edit Event: {event_name}</h1>

                <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg">
                    {/* Step Indicator as Tabs */}
                    <ul className="mb-6 flex items-center justify-center space-x-2">
                        {steps.map((stepName, index) => (
                            <li
                                key={index}
                                onClick={() => handleStepClick(index + 1)}
                                className={`cursor-pointer flex items-center p-1 px-2 rounded-md text-sm ${step === index + 1
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                                    : 'bg-white text-gray-500 hover:text-gray-700'
                                    }`}>
                                {stepName}
                            </li>
                        ))}
                    </ul>

                    {/* Form Content */}
                    <form className="space-y-6" onSubmit={(ev) => ev.preventDefault()}>
                        {
                            step == 1 && (
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
                                            value={event_category.category_name}
                                            setSelectChange={(option) => setEventCategory({ category_name: option.label, category_slug: option.value })}
                                            label='Select Event Category'
                                            placeholder='Select Event Category'
                                            options={eventCategories}
                                            defaultSelectedValue={{
                                                value: event_category.category_slug,
                                                label: event_category.category_name
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        {
                            step == 2 && (
                                <div>
                                    <div>
                                        <InputField
                                            type="date"
                                            value={event_date}
                                            onChange={(e) => setEventDate(e.target.value)}
                                            placeholder="Enter event date"
                                            label='Event Date'
                                            inputLeft={<FaCalendarAlt className="text-gray-500" />}
                                        />
                                    </div>
                                    <div>
                                        <InputField
                                            type="time"
                                            value={event_time}
                                            onChange={(e) => setEventTime(e.target.value)}
                                            placeholder="Enter event time"
                                            label='Event Time'
                                            inputLeft={<FaClock className="text-gray-500" />}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        {
                            step == 3 && (
                                <div>
                                    <div>
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
                                            value={venue_description}
                                            onChange={(e) => setVenueDescription(e.target.value)}
                                            placeholder="Enter venue description..."
                                            label='Venue Description'
                                            inputLeft={<FaNoteSticky className="text-gray-500" />}
                                        />
                                    </div>
                                </div>
                            )
                        }

                        {
                            step == 4 && (
                                <EventImage
                                    event_image={event_image}
                                    handleEventImageChange={handleEventImageChange}
                                    eventImageUploadLoading={eventImageUploadLoading}
                                    setEventImage={setEventImage}
                                    setEventImageUploadLoading={setEventImageUploadLoading}
                                    uploadFile={uploadFile}
                                    handleRemoveImage={handleRemoveImage}
                                />
                            )
                        }
                    </form>
                </div>

                {/* Navigation Buttons */}
                <div className="bg-white p-8 rounded-md fixed inset-x-0 bottom-0">
                    <div className="wrapper flex justify-between">
                        <div>
                            {step > 1 && (
                                <Button onClick={handlePrevStep} variant='outline'>Previous</Button>
                            )}
                        </div>
                        {step < 4 && (
                            <div className='flex items-center justify-center'>
                                <Button onClick={handleNextStep} variant='outline'>Next</Button>
                            </div>
                        )}

                        {
                            step == 4 && (
                                <div className='flex items-center justify-center'>
                                    <Button onClick={() => handleAddEvent(eventID)} disabled={createEventLoading}>
                                        {
                                            createEventLoading ? <BarLoader color='white' /> : "Update Event"
                                        }
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </PrivateRoute>
    );
}
