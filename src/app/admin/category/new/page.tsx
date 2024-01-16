"use client";

import { EventCategory } from '@/app/events/event.types';
import { Button } from '@/components';
import InputField from '@/components/InputField'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa';
import { FaA } from 'react-icons/fa6';

export default function AdminAddEventCategoryPage() {
    const router = useRouter();

    const [category, setCategory] = useState<EventCategory>({
        category_name: '',
        category_slug: '',
    });

    const handleCategoryChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCategory({
            ...category,
            [ev.target.name]: ev.target.value,
        });
    }

    const handleAddCategory = () => {
        console.log(category);
    }

    return (
        <div className='space-y-12'>
            <div className='flex items-center'>
                <button title='Go back' className='p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300' onClick={() => router.back()}>
                    <FaChevronLeft />
                </button>

                <div className='flex-1 text-center'>
                    <h1 className="text-4xl font-bold text-center text-blue-600">Create Event Category</h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg">
                <form className="space-y-6" onSubmit={(ev) => ev.preventDefault()}>
                    <div>
                        <InputField
                            type="text"
                            value={category.category_name}
                            onChange={handleCategoryChange}
                            placeholder="Enter category name"
                            label='Category Name'
                        />

                        <InputField
                            type="text"
                            value={category.category_slug}
                            onChange={handleCategoryChange}
                            placeholder="Enter category slug"
                            label='Category Slug'
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <Button onClick={handleAddCategory}>
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
