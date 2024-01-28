"use client";

import { Button } from '@/components'
import Link from 'next/link';
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css';
import { EventCategory } from './event.types';
import { HiXMark } from 'react-icons/hi2';

const MobileCategories = ({ categoryLoading, categories, event_category_slug }: { categoryLoading: boolean, categories: EventCategory[], event_category_slug?: string }) => {
    const [showCategories, setShowCategories] = useState<boolean>(false);
    return (
        <div className='lg:hidden'>
            <div className='mb-4'>
                <Button size='sm' onClick={() => setShowCategories(true)}>Categories</Button>
            </div>

            {
                showCategories && (
                    <div className='fixed inset-0 bg-white z-50 p-8 space-y-4'>
                        <div className='flex items-center justify-between gap-4 px-8'>
                            <h2 className='text-lg font-bold'>Categories</h2>

                            <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={() => setShowCategories(false)}>
                                <HiXMark className='w-6 h-6' />
                            </div>
                        </div>

                        <div className='w-full h-[1px] bg-gray-100'></div>

                        <ul>
                            {
                                categoryLoading ? (
                                    <Skeleton count={10} className='h-8 w-full rounded-md' baseColor='white' />
                                ) : (
                                    categories.length > 0 ? (
                                        categories.map((category) => (
                                            <li key={category.id}>
                                                <Link href={`/events/${category.category_slug}`} className={`block p-2 px-8 rounded-md transition duration-300 hover:text-blue-800 hover:bg-blue-100 ${category.category_slug === event_category_slug ? 'bg-blue-100 text-blue-800' : ''}`}>
                                                    {category.category_name}
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <p>No categories found.</p>
                                    )
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default MobileCategories