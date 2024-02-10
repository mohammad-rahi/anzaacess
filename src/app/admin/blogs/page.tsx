"use client";

import { EventTypes } from '@/app/events/event.types';
import { Button } from '@/components'
import { supabase } from '@/config/supabase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AdminBlogViewModal from './AdminBlogViewModal';
import AdminBlogEditModal from './AdminBlogEditModal';
import { BlogTypes } from '@/app/blog/blog.types';
import AdminNewBlogModal from './AdminNewBlogModal';

// href={`/events/${event.event_category.category_slug}/${event.event_slug}`}

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState<BlogTypes[]>([]);
  const [blogsLoading, setBlogsLoading] = useState<boolean>(true);
  const [blogForView, setBlogForView] = useState<BlogTypes | null>(null);
  const [blogForEdit, setBlogForEdit] = useState<BlogTypes | null>(null);
  const [showNewBlogModal, setShowNewBlogModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase.from('blogs').select('*');

      if (error) {
        console.error('Error fetching blogs:', error);
      }

      if (data) {
        setBlogs(data);
      }

      setBlogsLoading(false);
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogForView || blogForEdit) {
      document.body.classList.add('overflow-hidden');
    }
    else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [blogForView, blogForEdit]);

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between gap-8'>
        <h1 className='text-3xl font-bold'>Blogs</h1>

        <div>
          <Button onClick={() => setShowNewBlogModal(true)}>New</Button>
        </div>
      </div>

      <div>
        <ul className='space-y-4'>
          {
            blogsLoading ? (
              <Skeleton count={5} className='p-4 py-7 rounded-md shadow-sm mt-4' baseColor='white' />
            ) : (
              blogs.length > 0 ? (
                blogs.map((blog) => (
                  <li key={blog.id} className='bg-white p-4 rounded-md shadow-sm overflow-hidden grid grid-cols-[auto_1fr_auto] place-items-center group'>
                    <div className='flex items-center gap-8'>
                      {
                        blog.title && (
                          <div className='relative aspect-video rounded-md overflow-hidden w-28'>
                            <Image src={blog.image_url} alt={blog.title} fill />
                          </div>
                        )
                      }
                      <span className='font-bold'>{blog.title.length > 30 ? `${blog.title.slice(0, 30)}...` : blog.title
                      }</span>
                    </div>

                    <span className={`text-white text-sm ${blog.status == 'published' ? 'bg-green-600' : 'bg-yellow-600'} px-2 py-1 rounded`}>{blog.status}</span>

                    <div className='group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto flex items-center gap-4'>
                      <Button size='sm' variant='outline' onClick={() => setBlogForView(blog)}>View</Button>
                      <Button size='sm' variant='outline' onClick={() => setBlogForEdit(blog)}>Edit</Button>
                    </div>
                  </li>
                ))
              ) : (
                <div className='flex items-center justify-center text-sm text-gray-700 py-16'>
                  <p>No blogs found.</p>
                </div>
              )
            )
          }
        </ul>
      </div>

      {
        blogForView && (
          <AdminBlogViewModal
            onClose={() => setBlogForView(null)}
            blog={blogForView}
          />
        )
      }

      {
        showNewBlogModal && (
          <AdminNewBlogModal
            onClose={() => setShowNewBlogModal(false)}
          />
        )
      }

      {/* {
        blogForEdit && (
          <AdminBlogEditModal
            onClose={() => setBlogForEdit(null)}
            blog={blogForEdit}
          />
        )
      } */}
    </div>
  )
}
