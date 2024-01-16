"use client";
import { EventCategory } from '@/app/events/event.types';
import { Button } from '@/components'
import { supabase } from '@/config/supabase';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('event_categories').select('*');

      if (error) {
        console.error('Error fetching categories:', error);
      }

      if (data) {
        setCategories(data);
      }

      setCategoryLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between gap-8'>
        <h1 className='text-3xl font-bold'>Event Categories</h1>

        <div>
          <Button href="/admin/category/new">New</Button>
        </div>
      </div>

      <div>
        <ul className='space-y-4'>
          {
            categoryLoading ? (
              <Skeleton count={5} className='bg-blue-50 p-4 py-7 rounded-md shadow-sm mt-4' />
            ) : (
              categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category.id} className='bg-blue-50 p-4 rounded-md shadow-sm overflow-hidden flex items-center justify-between gap-8 group'>
                    <span className='font-bold'>{category.category_name}</span>

                    <div className='group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto'>
                      <Button variant='outline'>Edit</Button>
                    </div>
                  </li>
                ))
              ) : (
                <div className='flex items-center justify-center text-sm text-gray-700 py-16'>
                  <p>No categories found.</p>
                </div>
              )
            )
          }
        </ul>
      </div>
    </div>
  )
}
