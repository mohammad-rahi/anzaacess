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
    <div className={`space-y-4 md:space-y-8 ${!isEnd && 'border-b sm:pb-8'} bg-white rounded-md shadow overflow-hidden p-4 md:p-8`}>
      <h1 className='text-lg sm:text-xl md:text-2xl font-bold mb-4'>{category}</h1>

      <div className="relative">
        {showPrevButton && (
          <div className='absolute top-1/2 -translate-y-1/2 -left-4'>
            <Button onClick={() => handleScroll('prev')}>
              <HiChevronLeft className='w-6 h-6' />
            </Button>
          </div>
        )}

        <div className="flex overflow-x-auto gap-4 md:gap-8" ref={scrollContainerRef}>
          {eventsWithCategory[category].map((event) => (
            <div key={event.id} style={{ minWidth: '280px', maxWidth: '280px' }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {showNextButton && (
          <div className='absolute top-1/2 -translate-y-1/2 -right-4'>
            <Button onClick={() => handleScroll('next')}>
              <HiChevronRight className='w-6 h-6' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCategory;
