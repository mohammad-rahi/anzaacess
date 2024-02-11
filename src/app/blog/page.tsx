"use client";

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import _debounce from 'lodash/debounce';
import { supabase } from '@/config/supabase';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import EventsCategory from '../EventsCategory';
import InputField from '@/components/InputField';
import { BlogTypes } from './blog.types';
import BlogCard from './BlogCard';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [blogLoading, setBlogLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('status', 'published')

        if (error) {
          console.error('Error fetching events:', error);
        }

        if (data) {
          setBlogs([...(data as BlogTypes[]), ...(data as BlogTypes[]), ...(data as BlogTypes[])]);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
      finally {
        setBlogLoading(false);
      }
    };

    fetchBlogs();
  }, []);



  return (
    <div>
      {/* <EventPageHero
        categories={categories}
        categoryLoading={categoryLoading}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleFilterChange={() => {}}
        selectedCategory={null}
        selectedDate={null}
        selectedVenue={null}
      /> */}

      <div className="wrapper py-16d">

        <div className='mb-12'>
          <h1 className='text-3xl font-bold'>Blogs</h1>
        </div>

        <div className="space-y-4">
          {
            blogs.length > 0 ? (
              <div className='grid grid-cols-3 gap-4'>
                {
                  blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))
                }
              </div>
            ) : (
              blogLoading ? <p>Loading...</p> : <p>No blogs found</p>
            )
          }
        </div>
      </div>
    </div>
  )
};