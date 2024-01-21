"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { BarLoader } from 'react-spinners';
import { supabase } from '@/config/supabase';
import { Profile } from '@/app/(auth)/profile.types';
import { FaSpinner, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import Image from 'next/image';

import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function CreateUserForm({ username, isEditOwnProfile }: { username?: string, isEditOwnProfile?: boolean }) {
    const [profileID, setProfileID] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarURL, setAvatarURL] = useState('');
    const [roles, setRoles] = useState<Profile['roles']>({
        isAdmin: false,
        isUser: true,
    });
    const [userCreateLoading, setUserCreateLoading] = useState<boolean>(false);
    const [avatarUploadLoading, setAvatarUploadLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [imageStoragePath, sestImageStoragePath] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            if (username) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('username', username)
                    .single();
                if (error) {
                    console.error('Error fetching profile:', error);
                }
                if (data) {
                    setProfileID(data.id);
                    setName(data.name);
                    setEmail(data.email);
                    setRoles(data.roles);
                    setAvatarURL(data.avatar_url);
                    sestImageStoragePath(data.avatar_url);
                }
            }
        }

        fetchProfile();
    }, [username]);

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleCreate = async () => {
        if (!validateForm()) {
            return;
        }

        setError(null);
        setUserCreateLoading(true);

        try {
            const { data: { user }, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            // Successfully signed up, now add the user to the profiles table
            const { data, error: profileError } = await supabase
                .from('profiles')
                .insert(
                    [
                        {
                            user_id: user?.id,
                            name,
                            email,
                            username: user?.email?.split('@')[0],
                            avatar_url: imageStoragePath,
                            roles,
                        },
                    ]
                );

            if (profileError) {
                throw profileError;
            }

            // Reset form fields
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setRoles({
                isAdmin: false,
                isUser: true,
            });

            sestImageStoragePath(null);
            setAvatarURL('');

            // Optionally, you can redirect the user or perform other actions after successful signup
            console.log('User created successfully:', user);
        } catch (error: any) {
            if (error.code == "23505") {
                setError("Email already exists");
                console.error('Email already exists:', error);
            }
            else {
                setError(error.message);
                console.error('Error creating user:', error);
            }
        } finally {
            setUserCreateLoading(false);
            alert('User created successfully');
            router.back();
        }
    };

    const handleUpdate = async () => {
        if (!name && !email) {
            return;
        }

        setError(null);
        setUserCreateLoading(true);

        try {
            if (profileID) {
                if (isEditOwnProfile) {
                    const { data, error: profileError } = await supabase
                        .from('profiles')
                        .update(
                            [
                                {
                                    name,
                                    avatar_url: imageStoragePath,
                                },
                            ]
                        ).eq('id', profileID);

                    if (profileError) {
                        throw profileError;
                    }
                }
                else {
                    const { data, error: profileError } = await supabase
                        .from('profiles')
                        .update(
                            [
                                {
                                    name,
                                    avatar_url: imageStoragePath,
                                    roles,
                                },
                            ]
                        ).eq('id', profileID);

                    if (profileError) {
                        throw profileError;
                    }
                }
            }
        } catch (error: any) {
            setError(error.message);
            console.error('Error updating user:', error);
        } finally {
            setUserCreateLoading(false);
            alert('User updated successfully');
        }
    };

    const uploadFile = async (file: File) => {
        try {
            setAvatarUploadLoading(true);

            const slugifiedFileName = file.name
                .replace(/[^a-zA-Z0-9-]/g, '-')  // Replace non-alphanumeric characters with '-'
                .replace(/-+/g, '-')  // Replace consecutive '-' with a single '-'
                .toLowerCase();  // Convert the slug to lowercase

            const { data, error } = await supabase.storage.from('profile-images').upload(`avatars/${slugifiedFileName}-${uuidv4()}`, file);

            if (error) {
                throw error;
            } else if (data) {
                const { data: { publicUrl } } = supabase.storage.from('profile-images').getPublicUrl(data.path);

                setAvatarUploadLoading(false);
                return publicUrl;
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            setAvatarUploadLoading(false);
            setError('Error uploading avatar');
        }

        return '';
    }

    const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (event as ChangeEvent<HTMLInputElement>).target.files

        if (files) {
            const eventImage = files[0];

            if (eventImage) {
                const previewURL = URL.createObjectURL(eventImage);
                setAvatarURL(previewURL);

                const imageUrl = await uploadFile(eventImage);
                setAvatarURL(imageUrl);
                sestImageStoragePath(imageUrl);
            }
        }
    }

    const deleteImage = async (path: string) => {
        try {
            const { error } = await supabase.storage.from('profile-images').remove([path]);

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
            setAvatarUploadLoading(true);

            try {
                const isDeleted = await deleteImage(editImagePath);

                if (isDeleted) {
                    setAvatarURL('');
                    setAvatarUploadLoading(false);
                } else {
                    // Handle deletion failure
                    setAvatarUploadLoading(false);
                    console.error('Failed to delete the image.');
                }
            } catch (error) {
                console.error('Error extracting path or deleting image:', error);
                setAvatarUploadLoading(false);
            }
        }
        else if (imageStoragePath) {
            setAvatarUploadLoading(true);

            try {
                const isDeleted = await deleteImage(imageStoragePath);

                if (isDeleted) {
                    setAvatarURL('');
                    setAvatarUploadLoading(false);
                } else {
                    // Handle deletion failure
                    setAvatarUploadLoading(false);
                    console.error('Failed to delete the image.');
                }
            } catch (error) {
                console.error('Error extracting path or deleting image:', error);
                setAvatarUploadLoading(false);
            }
        }
    };

    return (
        <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-lg shadow-lg">
            <form className="space-y-6" onSubmit={(ev) => ev.preventDefault()}>
                <div>
                    <InputField
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter user's name"
                        label="Name"
                    />

                    <InputField
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter user's email"
                        label="Email"
                        readOnly={!!username}
                    />

                    {
                        !username && (
                            <>
                                <InputField
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    label="Password"
                                />

                                <InputField
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    label="Confirm Password"
                                />
                            </>
                        )
                    }

                    <div className='mb-4'>
                        <input
                            type="file"
                            onChange={handleAvatarChange}
                            placeholder="Upload Event Image"
                            className="sr-only"
                            id="profile_avatar"
                            accept='image/png, image/jpeg, image/jpg'
                        />

                        {
                            avatarURL ? (
                                <div>
                                    <span className='block text-sm text-gray-700 font-semibold'>Avatar</span>
                                    <div className='relative w-32 h-32 rounded-md overflow-hidden border-2 border-gray-300'>
                                        <Image src={avatarURL} fill alt='Avatar' objectFit='cover' />

                                        <button
                                            title={avatarUploadLoading ? 'Uploading...' : 'Remove'}
                                            disabled={avatarUploadLoading}
                                            onClick={() => handleRemoveImage(imageStoragePath ? imageStoragePath : '')}
                                            className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 flex items-center justify-center p-1 rounded-full overflow-hidden cursor-pointer disabled:cursor-default"
                                        >
                                            {avatarUploadLoading ? <FaSpinner className="animate-spin text-white" /> : <FaTimes className='text-white' />}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label htmlFor="profile_avatar" title='Upload' className='w-fit'>
                                    <span className='block text-sm text-gray-700 font-semibold'>Avatar</span>

                                    <div className="flex flex-col items-center justify-center cursor-pointer aspect-square w-32 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="flex flex-col items-center justify-center">
                                            <FaUpload className="w-12 h-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">Upload avatar</p>
                                        </div>
                                    </div>
                                </label>
                            )
                        }
                    </div>

                    {
                        isEditOwnProfile ? (
                            null
                        ) : (
                            <div>
                                <label className="block text-sm text-gray-700 font-semibold">Roles</label>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center select-none hover:bg-blue-50 rounded-md overflow-hidden">
                                        <input
                                            type="checkbox"
                                            id="isAdmin"
                                            checked={roles.isAdmin}
                                            onChange={() => setRoles({ ...roles, isAdmin: !roles.isAdmin })}
                                            className="form-checkbox text-blue-500 h-5 w-5"
                                        />
                                        <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">Admin</label>
                                    </div>

                                    <div className="flex items-center select-none hover:bg-blue-50 rounded-md overflow-hidden">
                                        <input
                                            type="checkbox"
                                            id="isUser"
                                            checked={roles.isUser}
                                            onChange={() => setRoles({ ...roles, isUser: !roles.isUser })}
                                            className="form-checkbox text-blue-500 h-5 w-5"
                                        />
                                        <label htmlFor="isUser" className="ml-2 text-sm text-gray-700">User</label>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div >

                <div>
                    <p className='text-red-500 text-sm'>{error}</p>
                </div>

                <div className='flex items-center justify-center'>
                    <Button onClick={() => username ? handleUpdate() : handleCreate()} disabled={userCreateLoading}>
                        {
                            userCreateLoading ? <BarLoader color="#fff" /> : username ? 'Update User' : 'Create User'
                        }
                    </Button>
                </div>
            </form >
        </div >
    );
};
