"use client";

import { EventCategory } from '@/app/events/event.types';
import { Button } from '@/components';
import InputField from '@/components/InputField'
import { supabase } from '@/config/supabase';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa';
import { BarLoader } from 'react-spinners';

export default function AdminEditCategoryPage({ params: { category_slug } }: { params: { category_slug: string } }) {
    const router = useRouter();

    const [category, setCategory] = useState<EventCategory>({
        category_name: '',
        category_slug: '',
    });

    const [fetchedCategory, setFetchedCategory] = useState<EventCategory>({
        category_name: '',
        category_slug: '',
    });

    const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
    const [fetchingLoading, setFetchingLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCategory = async () => {
            const { data, error } = await supabase.from('event_categories').select('*').eq('category_slug', category_slug);

            if (error) {
                console.log(error);
            }

            if (data) {
                setCategory(data[0]);
                setFetchedCategory(data[0]);
                setFetchingLoading(false);
            }
        };

        fetchCategory();
    }, [category_slug]);

    const handleCategoryChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setCategory({
            ...category,
            category_name: ev.target.value,
        });
    }

    const handleUpdateCategory = async () => {
        if (!category.category_name || !fetchedCategory.category_slug) return;

        if(category.category_name === fetchedCategory.category_name) {
            router.push('/admin/category');
            return;
        }

        setCategoryLoading(true);

        const { data, error } = await supabase.from('event_categories').update({
            category_name: category.category_name,
        }).eq('category_slug', fetchedCategory.category_slug);

        if (error) {
            console.log(error);
        }

        if (data) {
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
                    <h1 className="text-4xl font-bold text-center text-blue-600">Edit Category: {category.category_name}</h1>
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
                            placeholder="Enter category slug"
                            label='Category Slug'
                            readOnly
                        />
                    </div>

                    <div className='flex items-center justify-center'>
                        <Button onClick={handleUpdateCategory} disabled={categoryLoading || fetchingLoading}>
                            {
                                categoryLoading ? <BarLoader color="#fff" /> : 'Update Category'
                            }
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
