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
    }, [event_slug]);

    return (
        <PrivateRoute>
            <div className="bg-blue-100 min-h-[650px] rounded-md px-8 py-20 mb-28 space-y-8">
                <div className='max-w-xl mx-auto w-full'>
                    <h1 className="text-3xl font-bold text-center text-blue-600">Edit Event: {event_name}</h1>
                </div>

                <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg">
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

                        <EventImage
                            event_image={event_image}
                            handleEventImageChange={handleEventImageChange}
                            eventImageUploadLoading={eventImageUploadLoading}
                            setEventImage={setEventImage}
                            setEventImageUploadLoading={setEventImageUploadLoading}
                            uploadFile={uploadFile}
                            handleRemoveImage={handleRemoveImage}
                        />

                        <div className='flex items-center justify-center'>
                            <Button onClick={() => handleAddEvent(eventID)} disabled={createEventLoading}>
                                {
                                    createEventLoading ? <BarLoader color='white' /> : "Update Event"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </PrivateRoute>
    );
}
