import { Button } from '@/components';
import Image from 'next/image';
import React from 'react';
import MobileCategories from './MobileCategories';
import InputField from '@/components/InputField';
import { EventCategory } from './event.types';

const EventPageHero = ({
    categoryLoading,
    categories,
    searchQuery,
    handleSearchChange,
    handleFilterChange,
    selectedCategory,
    selectedVenue,
    selectedDate,
}: {
    categoryLoading: boolean;
    categories: EventCategory[];
    searchQuery: string;
    handleSearchChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    handleFilterChange: (key: string, value: string | null) => void;
    selectedCategory: EventCategory | null;
    selectedVenue: string | null;
    selectedDate: string | null;
}) => {
    return (
        <section className="relative bg-blue-800 min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="wrapper max-w-5xl text-center relative z-20 text-white">
                <div className='flex flex-col items-center gap-8'>
                    <div className='flex-1 w-full md:w-3/4 lg:w-1/2'>
                        {/* Search bar */}
                        <InputField
                            type='text'
                            placeholder='Search for events...'
                            value={searchQuery}
                        //   onChange={handleSearchChange}
                        />
                    </div>
                    
                </div>
            </div>
            <div className='absolute inset-0 bg-black/50 z-10'></div>
            <div className='absolute inset-0'>
                <Image
                    src='/images/hero_image.jpg'
                    alt='Hero Image'
                    objectFit='cover'
                    layout='fill'
                    className='opacity-50'
                />
            </div>
        </section>
    );
};

export default EventPageHero;
