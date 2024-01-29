import React from 'react'
import { EventTypes } from './event.types'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import EventCard from './EventCard'

const EventCardLists = ({ eventLoading, events }: { eventLoading?: boolean, events: EventTypes[] }) => {
  return (
    <>
      {
        eventLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {
              Array.from({ length: 6 }).map((_, index) => (
                <div className='w-full block' key={index}>
                  <Skeleton className='h-96 rounded-md' baseColor='white' />
                </div>
              ))
            }
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'>
            {
              eventLoading ? (
                <Skeleton className='h-96 rounded-md' baseColor='white' count={10} />
              ) : (
                events.length > 0 ? (
                  events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))
                ) : (
                  <p>No events found.</p>
                )
              )
            }
          </div>
        )
      }
    </>
  )
}

export default EventCardLists