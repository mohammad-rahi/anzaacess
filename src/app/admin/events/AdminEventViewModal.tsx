import { EventTypes } from '@/app/events/event.types'
import { Modal } from '@/components'
import Image from 'next/image'
import React from 'react'
import { HiXMark } from 'react-icons/hi2'

const AdminEventViewModal = ({
    onClose,
    event
}: {
    onClose: () => void,
    event: EventTypes
}) => {
    return (
        <Modal onClose={onClose}>
            <div>
                <div className='flex items-center gap-8 justify-between p-8 py-4 border-b border-gray-100'>
                    <h1 className='text-lg font-bold'>{event.event_name.length > 36 ? event.event_name.slice(0, 36) + '...' : event.event_name}</h1>

                    <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={onClose}>
                        <HiXMark className='w-6 h-6' />
                    </div>
                </div>

                <div className="space-y-8 p-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-blue-50">
                            {event.event_image && (
                                <Image
                                    src={event.event_image}
                                    alt={event.event_name}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            )}
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold">{event.event_name}</h1>
                            <p className="text-gray-700">{event.event_description.slice(0, 200)}</p>

                            <div>
                                <p className="text-gray-800">
                                    <span className="font-bold">Date & Time:</span> {event.event_date} at {event.event_time}
                                </p>
                                <p className="text-gray-800">
                                    <span className="font-bold">Venue:</span> {event.event_venue}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">Event Details</h2>
                        <p>{event.event_description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AdminEventViewModal