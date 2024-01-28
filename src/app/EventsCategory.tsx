import React from 'react'
import EventCard from './events/EventCard'
import { EventCategory, EventTypes } from './events/event.types'

const EventsCategory = ({ category, eventsWithCategory, isEnd }: { category: string, eventsWithCategory: { [key: string]: EventTypes[] }, isEnd: boolean }) => {
    return (
        <div className={`space-y-4 ${!isEnd && 'border-b sm:pb-8'} bg-white rounded-md shadow overflow-hidden p-4`}>
            <h1 className='text-lg sm:text-xl font-bold'>{category}</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {
                    eventsWithCategory[category].map((event) => (
                        <EventCard event={event} key={event.id} size="sm" />
                    ))
                }
            </div>
        </div>
    )
}

export default EventsCategory