"use client";

import React, { useRef, useState, useEffect } from 'react';
import EventCard from './events/EventCard';
import { EventTypes } from './events/event.types';
import { Button } from '@/components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

interface EventsCategoryProps {
  category: string;
  eventsWithCategory: { [key: string]: EventTypes[] };
  isEnd: boolean;
}

const EventsCategory: React.FC<EventsCategoryProps> = ({ category, eventsWithCategory, isEnd }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        setShowPrevButton(container.scrollLeft > 0);
        setShowNextButton(container.scrollLeft < container.scrollWidth - container.clientWidth);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScroll = (position: 'prev' | 'next') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = position === 'prev' ? -container.clientWidth : container.clientWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`space-y-4 bg-white rounded-md shadow overflow-hidden p-4`}>
      <h1 className='text-lg md:text-xl font-bold mb-4'>{category}</h1>

      <div className="relative">
        {showPrevButton && (
          <div className='absolute top-1/2 -translate-y-1/2 left-0 z-10'>
            <Button onClick={() => handleScroll('prev')} size='sm'>
              <HiChevronLeft className='w-6 h-6' />
            </Button>
          </div>
        )}

        <div className="flex overflow-x-auto gap-4" ref={scrollContainerRef}>
          {eventsWithCategory[category].map((event) => (
            <div key={event.id} style={{ minWidth: '320px', maxWidth: '320px' }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {showNextButton && (
          <div className='absolute top-1/2 -translate-y-1/2 right-0'>
            <Button onClick={() => handleScroll('next')} size='sm'>
              <HiChevronRight className='w-6 h-6' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCategory;
