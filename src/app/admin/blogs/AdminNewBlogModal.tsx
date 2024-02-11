import { Button, Modal } from '@/components';
import InputField from '@/components/InputField';
import React from 'react';
import { FaStickyNote, FaTicketAlt } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { BarLoader } from 'react-spinners';
import { v4 as uuid4 } from 'uuid';
import BlogImage from './BlogImage';
import useBlog from './useBlog';

const AdminNewBlogModal = ({
    onClose,
}: {
    onClose: () => void
}) => {
    const {
        handleBlogImageChange,
        blogData,
        setBlogData,
        validationErrors,
        createBlogLoading,
        handleBlogSubmit,
        setBlogImageUploadLoading,
        uploadFile,
        handleRemoveImage,
        blogImageUploadLoading } = useBlog({
            onClose
        });

    return (
        <Modal onClose={onClose}>
            <div>
                <div className='flex items-center gap-8 justify-between p-8 py-4 border-b border-gray-100'>
                    <h1 className='text-lg font-bold'>New Blog</h1>

                    <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={onClose}>
                        <HiXMark className='w-6 h-6' />
                    </div>
                </div>

                <form className="space-y-6 p-8 max-h-[70vh] overflow-y-auto" onSubmit={(ev) => ev.preventDefault()}>
                    {/* Blog Details */}
                    <div>
                        <InputField
                            type="text"
                            value={blogData.title}
                            onChange={(e) => setBlogData({ ...blogData, title: e.target.value, slug: `${e.target.value.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}-${uuid4().replace('-', '').slice(0, 8)}` })}
                            placeholder="Enter blog title"
                            label="Blog Title"
                            inputLeft={<FaTicketAlt className="text-gray-500" />}
                            error={validationErrors.title}
                        />

                        <InputField
                            type="text"
                            value={blogData.slug}
                            readOnly
                            placeholder="Enter blog slug"
                            label="Blog Slug"
                            inputLeft={<FaStickyNote className="text-gray-500" />}
                        />

                        <div className='mb-4'>
                            <BlogImage
                                blogImage={blogData.image_url}
                                imageUploadLoading={blogImageUploadLoading}
                                handleBlogImageChange={handleBlogImageChange}
                                setBlogImage={(image_url) => setBlogData({ ...blogData, image_url })}
                                setBlogImageUploadLoading={(loading) => setBlogImageUploadLoading(loading)}
                                uploadFile={uploadFile}
                                handleRemoveImage={handleRemoveImage}
                            />
                        </div>

                        <InputField
                            value={blogData.content}
                            onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
                            placeholder="Enter blog content..."
                            label="Content"
                            inputLeft={<FaStickyNote className="text-gray-500" />}
                            error={validationErrors.content}
                        />

                        <div>
                            <label htmlFor="blog-status" className="block text-sm font-medium text-gray-700">
                                Blog Status
                            </label>
                            <select
                                id="blog-status"
                                name="blog-status"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={blogData.status}
                                onChange={(e) => setBlogData({ ...blogData, status: e.target.value })}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <Button onClick={handleBlogSubmit} disabled={createBlogLoading}>
                            {createBlogLoading ? <BarLoader color="white" /> : 'Create Blog'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default AdminNewBlogModal