"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const EventDetailsHero = ({ event_name, event_image }: { event_name: string, event_image: string }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className='relative h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-300 via-blue-200 to-blue-100'>
            {event && (
                <div className="absolute inset-0">
                    <Image
                        src={event_image}
                        alt={event_name}
                        objectFit="cover"
                        layout="fill"
                        className="transform scale-110 hover:scale-105 transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateY(-${scrollPosition / 3}px)` }}
                    />
                </div>
            )}
            <div className="pattern-overlay absolute inset-0 bg-gradient-to-b from-transparent to-blue-100"></div>
            <div className="wrapper max-w-5xl text-center relative z-20 text-gray-800">
                {event && (
                    <div className="space-y-5">
                        <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight shadow-md leading-tight'>
                            {event_name}
                        </h1>
                    </div>
                )}
            </div>
        </section>
    );
}

export default EventDetailsHero;
