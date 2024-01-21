"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { BarLoader } from 'react-spinners';
import { supabase } from '@/config/supabase';
import { Profile } from '@/app/(auth)/profile.types';
import { FaUpload } from 'react-icons/fa';

export default function CreateUserForm({ username }: { username?: string }) {
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
    const [error, setError] = useState<string | null>(null);

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
                            avatar_url: '',
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
        }
    };

    const handleUpdate = async () => {
        if (!validateForm()) {
            return;
        }

        setError(null);
        setUserCreateLoading(true);

        try {
            if (profileID) {
                const { data, error: profileError } = await supabase
                    .from('profiles')
                    .update(
                        [
                            {
                                name,
                                avatar_url: '',
                                roles,
                            },
                        ]
                    ).eq('id', profileID);

                if (profileError) {
                    throw profileError;
                }
            }
        } catch (error: any) {
            setError(error.message);
            console.error('Error creating user:', error);
        } finally {
            setUserCreateLoading(false);
        }
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const files = (event as ChangeEvent<HTMLInputElement>).target.files

        if (files && files.length > 0) {
            setAvatarURL(URL.createObjectURL(files[0]));
        }
    }

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

                    <div className='mb-4'>
                        <input
                            type="file"
                            onChange={handleAvatarChange}
                            placeholder="Upload Event Image"
                            className="sr-only"
                            id="profile_avatar"
                            accept='image/png, image/jpeg, image/jpg'
                        />

                        <label htmlFor="profile_avatar">
                            <span className='block text-sm text-gray-700 font-semibold'>Avatar</span>
                            <div className="flex flex-col items-center justify-center cursor-pointer aspect-square w-32 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="flex flex-col items-center justify-center">
                                    <FaUpload className="w-12 h-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500">Upload avatar</p>
                                </div>
                            </div>
                        </label>
                    </div>

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
                </div>

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
            </form>
        </div>
    );
};
