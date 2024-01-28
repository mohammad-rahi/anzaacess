import React from 'react'
import EventCard from './events/EventCard'
import { EventCategory, EventTypes } from './events/event.types'

const EventsCategory = ({ category, eventsWithCategory, isEnd }: { category: string, eventsWithCategory: { [key: string]: EventTypes[] }, isEnd: boolean }) => {
    return (
        <div className={`space-y-4 ${!isEnd && 'border-b pb-8'}`}>
            <h1 className='text-xl font-bold'>{category}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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