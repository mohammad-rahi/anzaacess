import { supabase } from '@/config/supabase';
import React from 'react'
import { BlogTypes } from '../blog.types';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import moment from 'moment';

const fetchBlog = async (blog_slug: string): Promise<BlogTypes> => {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('slug', blog_slug)
            .single();

        if (error) throw error;

        if (data) {
            return data;
        } else {
            notFound()
        }
    } catch (error) {
        console.error('Error fetching blog:', error);
        notFound();
    }
}

const BlogDetailsPage = async ({ params: { blog_slug } }: { params: { blog_slug: string } }) => {
    const blog = await fetchBlog(blog_slug);

    return (
        <div>
            <div className='w-full max-w-2xl mx-auto space-y-8'>
                <h1 className='text-3xl font-bold'>{blog.title}</h1>

                {
                    blog.image_url && (
                        <div className='relative aspect-video w-full rounded-md overflow-hidden'>
                            <Image src={blog.image_url} alt={blog.title} fill objectFit='cover' />
                        </div>
                    )
                }

                <p>{moment(blog.created_at).fromNow()}</p>

                <div>
                    {
                        blog.content
                    }
                </div>
            </div>
        </div>
    )
}

export default BlogDetailsPage