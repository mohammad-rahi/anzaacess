"use client";

import { EventCategory } from '@/app/events/event.types';
import { Button } from '@/components';
import InputField from '@/components/InputField'
import { supabase } from '@/config/supabase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { BarLoader } from 'react-spinners';

export default function AdminAddEventCategoryPage() {
    const router = useRouter();

    const [category, setCategory] = useState<EventCategory>({
        category_name: '',
        category_slug: '',
    });

    const [categoryLoading, setCategoryLoading] = useState<boolean>(false);

    const handleCategoryChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCategory({
            ...category,
            category_name: ev.target.value,
            category_slug: ev.target.value.trim() && `${ev.target.value.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().replace(/-/g, '').slice(0, 5)}`,
        });
    }

    const handleAddCategory = async () => {
        if (!category.category_name || !category.category_slug) return;

        setCategoryLoading(true);

        const { data, error } = await supabase.from('event_categories').insert([category]);

        if (error) {
            console.log(error);
        } else {
            router.push('/admin/category');
        }

        setCategoryLoading(false);
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
                            autoFocus
                        />

                        <InputField
                            type="text"
                            value={category.category_slug}
                            onChange={handleCategoryChange}
                            placeholder="Enter category slug"
                            label='Category Slug'
                            readOnly
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <Button onClick={handleAddCategory} disabled={categoryLoading}>
                            {
                                categoryLoading ? <BarLoader color="#fff" /> : 'Create Category'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
