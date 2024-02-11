import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BlogTypes } from './blog.types';
import moment from 'moment';

interface BlogCardProps {
    blog: BlogTypes;
    size?: 'sm' | 'md';
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, size = 'md' }) => {
    return (
        <Link
            href={`/blog/${blog.slug}`}
            className='block group bg-white rounded-md shadow-md group-hover:shadow-lg group-hover:bg-blue-50 transition duration-300 hover:underline overflow-hidden'
        >
            <div className={`block ${size === 'sm' ? 'md:flex' : ''} relative aspect-[4/3] group-hover:scale-105 transition duration-300`}>
                {blog.image_url && (
                    <Image src={blog.image_url} alt={blog.title} objectFit="cover" layout="fill" />
                )}

                <div className="overlay p-4 text-white bg-gradient-to-b from-transparent to-black absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex flex-col gap-4 justify-end">
                    <div>
                        <div className="flex items-center gap-4 text-sm text-white">
                            <p>
                                {moment(blog.created_at).fromNow()}
                            </p>
                        </div>


                    </div>

                    <h3 className={`text-xl font-bold mb-2 ${size === 'md' ? 'line-clamp-2' : ''}`}>{blog.title}</h3>
                </div>
            </div>

            <div className='sm:hidden bg-blue-100 p-2 rounded-b-md overflow-hidden'>
                <h3 className={`text-xl font-bold ${size === 'md' ? 'line-clamp-2' : ''}`}>{blog.title}</h3>
            </div>
        </Link>
    )
}

export default BlogCard