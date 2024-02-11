"use client";

import Image from 'next/image'
import React, { useState } from 'react'
import { FaSpinner, FaTimes, FaUpload } from 'react-icons/fa'

export default function BlogImage({
    blogImage,
    imageUploadLoading,
    handleBlogImageChange,
    setBlogImage,
    setBlogImageUploadLoading,
    uploadFile,
    handleRemoveImage
}: {
    blogImage: string,
    imageUploadLoading: boolean,
    handleBlogImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    setBlogImage: (image_url: string) => void,
    setBlogImageUploadLoading: (loading: boolean) => void,
    uploadFile: (file: File) => Promise<void>,
    handleRemoveImage: (imagePath?: string) => void
}) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement | HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        setBlogImageUploadLoading(true);

        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                if (e.target?.result) {
                    setBlogImage(e.target.result.toString());

                    const blogImage = files[0];
                    await uploadFile(blogImage);
                    
                }
            };

            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleBlogImageChange}
                placeholder="Upload Event Image"
                className="sr-only"
                id="event_image"
                accept='image/png, image/jpeg, image/jpg'
            />

            <div className={`text-gray-700 text-sm font-semibold flex items-center justify-between gap-8 w-full`}>
                <span>
                    Upload Blog Image
                    <span className="text-xs font-normal">(.png, .jpg, .jpeg)</span>
                </span>
                <span className="text-xs font-normal">16:9 ratio</span>
            </div>

            <div
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative aspect-video w-full text-sm border-2 border-gray-300 border-dashed rounded-md overflow-hidden ${isDragging ? 'bg-blue-100' : ''}`}
            >
                {blogImage ? (
                    <>
                        <Image src={blogImage} alt="Event Image Preview" fill objectFit="cover" />

                        <button
                            title={imageUploadLoading ? 'Uploading...' : 'Remove'}
                            disabled={imageUploadLoading}
                            onClick={() => handleRemoveImage(blogImage)}
                            className="absolute top-2 right-2 bg-white/60 hover:bg-white/80 flex items-center justify-center p-1 rounded-full overflow-hidden cursor-pointer disabled:cursor-default"
                        >
                            {imageUploadLoading ? <FaSpinner className="animate-spin" /> : <FaTimes />}
                        </button>
                    </>
                ) : (
                    <div className="absolute inset-x-0 inset-y-0">
                        <label htmlFor="event_image">
                            <div className="aspect-video flex flex-col items-center justify-center cursor-pointer">
                                <div className="flex flex-col items-center justify-center">
                                    <FaUpload className="w-12 h-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500">Upload Image</p>
                                </div>
                            </div>
                        </label>
                    </div>
                )}
            </div>
        </div>
    )
}
