"use client";

import { EventStatus, EventTypes } from '@/app/events/event.types'
import EventImage from '@/app/events/new/EventImage'
import useEvent from '@/app/events/new/useEvent'
import { Button, Modal } from '@/components'
import InputField from '@/components/InputField'
import { useEventContext } from '@/contexts/EventContext'
import React, { useEffect } from 'react'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaStickyNote, FaTicketAlt } from 'react-icons/fa'
import { FaNoteSticky } from 'react-icons/fa6'
import { HiXMark } from 'react-icons/hi2'
import { BarLoader } from 'react-spinners'

const AdminEventEditModal = ({
    onClose,
    event
}: {
    onClose: () => void,
    event: EventTypes
}) => {
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
        status,
    }, setEventName, setEventDescription, setEventDate, setEventTime, setEventVenue, setVenueDescription, setEventCategory, setEventImage, setStatus, setEventToEdit } = useEventContext();

    const { eventCategories, handleEventImageChange, handleAddEvent, eventImageUploadLoading, step, handleNextStep, handlePrevStep, handleStepClick, steps, setEventImageUploadLoading, uploadFile, createEventLoading, handleRemoveImage } = useEvent();

    useEffect(() => {
        if (event) {
            setEventToEdit(event);
        }
    }, [event])

    return (
        <Modal onClose={onClose}>
            <div>
                <div className='flex items-center gap-8 justify-between p-8 py-4 border-b border-gray-100'>
                    <h1 className='text-lg font-bold'><span className='text-blue-500'>Edit: </span> {event.event_name.length > 32 ? event.event_name.slice(0, 32) + '...' : event.event_name}</h1>

                    <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={onClose}>
                        <HiXMark className='w-6 h-6' />
                    </div>
                </div>

                <div className="space-y-8 p-8 max-h-[70vh] overflow-y-auto">
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

                        <div>
                            <label htmlFor="status" className='text-gray-700 text-sm font-semibold flex items-center justify-between gap-8 w-full'>
                                Status:
                            </label>

                            <div className='flex items-center gap-8'>
                                <label htmlFor="draft" className='text-sm font-medium text-gray-600 flex items-center gap-1 hover:bg-blue-50 p-1 rounded-md'>

                                    <input type="radio" name="status" id="draft" value="draft" checked={status === "draft"} onChange={(e) => setStatus(e.target.value as EventStatus)} className="mr-2" />
                                    Draft
                                </label>

                                <label htmlFor="published" className='flex items-center gap-1 hover:bg-blue-50 p-1 rounded-md text-sm font-medium text-gray-600'>
                                    <input type="radio" name="status" id="published" value="published" checked={status === "published"} onChange={(e) => setStatus(e.target.value as EventStatus)} className="mr-2" />

                                    Publish
                                </label>
                            </div>
                        </div>

                        <div className='flex items-center justify-center'>
                            <Button onClick={() => handleAddEvent(eventID, onClose)} disabled={createEventLoading}>
                                {
                                    createEventLoading ? <BarLoader color='white' /> : "Update Event"
                                }
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    )
}

export default AdminEventEditModal