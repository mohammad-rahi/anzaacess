import { BlogTypes } from '@/app/blog/blog.types'
import { EventTypes } from '@/app/events/event.types'
import { Modal } from '@/components'
import Image from 'next/image'
import React from 'react'
import { HiXMark } from 'react-icons/hi2'

const AdminBlogViewModal = ({
    onClose,
    blog
}: {
    onClose: () => void,
    blog: BlogTypes
}) => {
    return (
        <Modal onClose={onClose}>
            <div>
                <div className='flex items-center gap-8 justify-between p-8 py-4 border-b border-gray-100'>
                    <h1 className='text-lg font-bold'>{blog.title.length > 36 ? blog.title.slice(0, 36) + '...' : blog.title}</h1>

                    <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={onClose}>
                        <HiXMark className='w-6 h-6' />
                    </div>
                </div>

                <div className="space-y-8 p-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-blue-50">
                            {blog.image_url && (
                                <Image
                                    src={blog.image_url}
                                    alt={blog.title}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            )}
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-3xl font-bold">{blog.title}</h1>
                            <p className="text-gray-700">{blog.content.slice(0, 200)}</p>

                            <div>
                                <p className="text-gray-800">
                                    <span className="font-bold">Created At:</span> {blog.created_at}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">Event Details</h2>
                        <p>{blog.content}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default AdminBlogViewModal