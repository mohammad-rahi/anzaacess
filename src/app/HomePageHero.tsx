import { Button } from '@/components';
import Image from 'next/image';
import React from 'react';

const HomePageHero = () => {
    return (
        <section className='relative bg-blue-800 min-h-[60vh] flex items-center justify-center overflow-hidden'>
            <div className="wrapper max-w-5xl text-center relative z-20 text-white">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 space-y-5">
                    <p>Discover Exciting <span className="bg-blue-100 text-blue-600 inline-block -rotate-6 rounded-md">Events</span></p>
                    <p>Explore Amazing <span className="bg-blue-100 text-blue-600 inline-block -rotate-6 rounded-md mt-6 sm:mt-0">Destinations</span></p>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl opacity-80 my-8">
                    Your gateway to exciting experiences! Discover and book events effortlessly. <br /> Whether it&apos;s thrilling adventures or dreamy destinations, we&apos;ve got you covered!
                </p>

                <div className="w-full max-w-md mx-auto">
                    <Button href="/events" variant="primary" size="lg">
                        Explore Events
                    </Button>
                </div>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div className="absolute inset-0">
                <Image
                    src="/images/hero_image.jpg"
                    alt="Hero Image"
                    objectFit="cover"
                    layout="fill"
                    className="opacity-50"
                />
            </div>
        </section>
    );
}

export default HomePageHero;
