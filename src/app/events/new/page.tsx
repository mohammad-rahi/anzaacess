"use client";

import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { useEventContext } from '@/contexts/EventContext';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaTicketAlt, FaStickyNote, FaImages, FaTimes, FaSpinner, FaDollarSign, FaUpload } from 'react-icons/fa';
import Image from 'next/image';
import useEvent from './useEvent';
import { FaNoteSticky } from 'react-icons/fa6';
import EventImage from './EventImage';

export default function AddEvents() {
    const { state: {
        event_name,
        event_description,
        event_category,
        event_image,
        event_date_time,
        event_venue,
        tickets
    }, setEventName, setEventDescription, setEventDateTime, setEventVenue, setTicketTypes, setEventCategory, setEventImage } = useEventContext();

    const { eventCategories, handleEventImageChange, handleAddEvent, eventImageUploadLoading, step, handleNextStep, handlePrevStep, handleStepClick, steps } = useEvent();

    // Function to handle adding a new ticket
    const handleAddTicket = () => {
        setTicketTypes([...tickets, { id: '', name: '', price: 0, description: '' }]);
    };

    const handleRemoveTicket = (indexToRemove: number) => {
        setTicketTypes(tickets.filter((_, index) => index !== indexToRemove));
    };

    // Function to update ticket details
    const handleTicketChange = (index: number, field: string, value: string) => {
        const updatedTickets = [...tickets];
        (updatedTickets[index] as any)[field] = value; // Using type assertion here
        setTicketTypes(updatedTickets);
    };

    return (
        <div className="bg-blue-100 min-h-[650px] rounded-md py-12 mb-28 space-y-8">
            <h1 className="text-4xl font-bold text-center text-blue-600">Create New Event</h1>

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
                                        value={event_date_time}
                                        onChange={(e) => setEventDateTime(e.target.value)}
                                        placeholder="Enter event date"
                                        label='Event Date'
                                        inputLeft={<FaCalendarAlt className="text-gray-500" />}
                                    />
                                </div>
                                <div>
                                    <InputField
                                        type="time"
                                        value={event_date_time}
                                        onChange={(e) => setEventDateTime(e.target.value)}
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
                                        value={event_venue}
                                        onChange={(e) => setEventVenue(e.target.value)}
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
                            <div>
                                {tickets.map((ticket, index) => (
                                    <fieldset key={index} className='border rounded-md p-2 mb-4'>
                                        <legend className='font-bold text-sm'>Ticket {index + 1}</legend>
                                        <div className='mb-2 flex items-center gap-6'>
                                            <InputField
                                                type="text"
                                                label='Name'
                                                placeholder='VIP, Regular, etc.'
                                                value={ticket.name}
                                                onChange={(e) => handleTicketChange(index, 'name', e.target.value)}
                                                inputLeft={<FaTicketAlt className="text-gray-500" />}
                                            />

                                            <InputField
                                                type="number"
                                                label='Price'
                                                placeholder='Enter Ticket Price'
                                                value={ticket.name}
                                                onChange={(e) => handleTicketChange(index, 'price', e.target.value)}
                                                inputLeft={<FaDollarSign className="text-gray-500" />}
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
                        )
                    }

                    {
                        step == 5 && (
                            <EventImage
                                event_image={event_image}
                                handleEventImageChange={handleEventImageChange}
                                eventImageUploadLoading={eventImageUploadLoading}
                                setEventImage={setEventImage}
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
                    {step < 5 && (
                        <div className='flex items-center justify-center'>
                            <Button onClick={handleNextStep} variant='outline'>Next</Button>
                        </div>
                    )}

                    {
                        step == 5 && (
                            <div className='flex items-center justify-center'>
                                <Button onClick={handleAddEvent}>
                                    Create Event
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
