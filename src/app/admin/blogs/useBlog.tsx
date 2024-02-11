import { supabase } from '@/config/supabase';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useBlog = ({ onClose }: { onClose: () => void }) => {
    const [blogData, setBlogData] = useState({
        title: '',
        slug: '',
        image_url: '',
        content: '',
        status: 'draft',
    });

    const [createBlogLoading, setCreateBlogLoading] = useState(false);
    const [blogImageUploadLoading, setBlogImageUploadLoading] = useState(false);
    const [imageStoragePath, setImageStoragePath] = useState<string>();
    const [validationErrors, setValidationErrors] = useState({
        title: '',
        image_url: '',
        content: '',
    });

    const uploadFile = async (file: File) => {
        const { data, error } = await supabase.storage.from('blog-images').upload(`blog-images/${file.name}-${uuidv4()}`, file);

        if (error) {
            console.log(error);
            setBlogImageUploadLoading(false);
        }
        else if (data) {
            setBlogImageUploadLoading(false);

            const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(data.path);

            setImageStoragePath(publicUrl || "");

            if (!publicUrl) {
                // Handle upload failure
                console.error('Failed to upload the image.');
            }
        }
    }

    const deleteImage = async (path: string) => {
        try {
            const { error } = await supabase.storage.from('blog-images').remove([path]);

            if (error) {
                console.error('Error deleting image:', error);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Error deleting image:', error);
            return false;
        }
    };

    const handleRemoveImage = async (editImagePath?: string) => {
        if (editImagePath) {
            setBlogImageUploadLoading(true);

            try {
                const isDeleted = await deleteImage(editImagePath);

                if (isDeleted) {
                    setBlogData((prevData) => ({
                        ...prevData,
                        image_url: ""
                    }));
                    setBlogImageUploadLoading(false);
                } else {
                    // Handle deletion failure
                    setBlogImageUploadLoading(false);
                    console.error('Failed to delete the image.');
                }
            } catch (error) {
                console.error('Error extracting path or deleting image:', error);
                setBlogImageUploadLoading(false);
            }
        }
        else if (imageStoragePath) {
            setBlogImageUploadLoading(true);

            try {
                const isDeleted = await deleteImage(imageStoragePath);

                if (isDeleted) {
                    setBlogData((prevData) => ({
                        ...prevData,
                        image_url: ""
                    }));
                    setBlogImageUploadLoading(false);
                } else {
                    // Handle deletion failure
                    setBlogImageUploadLoading(false);
                    console.error('Failed to delete the image.');
                }
            } catch (error) {
                console.error('Error extracting path or deleting image:', error);
                setBlogImageUploadLoading(false);
            }
        }
    };

    const handleBlogImageChange = async (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (ev.target as HTMLInputElement).files;

        if (files) {
            const blogImage = files[0];

            if (blogImage) {
                const previewURL = URL.createObjectURL(blogImage);
                setBlogData((prevData) => ({ ...prevData, image_url: previewURL }));
                setBlogImageUploadLoading(true);

                await uploadFile(blogImage);

                setBlogImageUploadLoading(false);
            }
        }
    }

    const handleEditBlog = async (blogData: any, blogID: number) => {
        try {

            if(!blogID) throw new Error('Blog ID is required');

            const { data, error } = await supabase.from('blogs').update([blogData]).eq('id', blogID);

            if (error) throw error;

        } catch (error) {
            console.error('Error adding blog:', error);
        }
    }

    const handleAddBlog = async (blogData: any) => {
        try {
            const { data, error } = await supabase.from('blogs').insert([blogData]);

            if (error) throw error;

        } catch (error) {
            console.error('Error adding blog:', error);
        }
    }

    const handleBlogSubmit = async (blogID?: number) => {
        try {
            // Simple validation
            if (!blogData.title || !blogData.image_url || !blogData.content) {
                setValidationErrors({
                    title: !blogData.title ? 'Title is required' : '',
                    image_url: !blogData.image_url ? 'Image URL is required' : '',
                    content: !blogData.content ? 'Content is required' : '',
                });
                return;
            }

            setCreateBlogLoading(true);

            if (blogID) {
                await handleEditBlog({
                    title: blogData.title,
                    slug: blogData.slug,
                    image_url: imageStoragePath,
                    content: blogData.content,
                    status: blogData.status
                }, blogID);
            }
            else {
                await handleAddBlog({
                    title: blogData.title,
                    slug: blogData.slug,
                    image_url: imageStoragePath,
                    content: blogData.content,
                    status: blogData.status
                });
            }

            // Reset form after successful submission
            setBlogData({
                title: '',
                slug: '',
                image_url: '',
                content: '',
                status: 'draft',
            });
            setValidationErrors({
                title: '',
                image_url: '',
                content: '',
            });

            onClose();
        } catch (error) {
            console.error('Error submitting blog:', error);
        } finally {
            setCreateBlogLoading(false);
        }
    };

    return {
        handleBlogImageChange,
        blogData,
        setBlogData,
        validationErrors,
        createBlogLoading,
        blogImageUploadLoading,
        setBlogImageUploadLoading,
        handleBlogSubmit,
        uploadFile,
        handleRemoveImage
    };
}

export default useBlog