"use client";

import React, { useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { BarLoader } from 'react-spinners';
import { supabase } from '@/config/supabase';
import { Profile } from '@/app/(auth)/profile.types';

export default function CreateUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState<Profile['roles']>({
        isAdmin: false,
        isUser: true,
    });
    const [userCreateLoading, setUserCreateLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const validateForm = () => {
        if (!name || !email || !password || !confirmPassword || !role) {
            setError('All fields are required');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
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
                            avatar_url: '',
                            role: role,
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
            setRole({
                isAdmin: false,
                isUser: true,
            });

            // Optionally, you can redirect the user or perform other actions after successful signup
            console.log('User created successfully:', user);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setUserCreateLoading(false);
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

                    <div>
                        <label className="block text-sm text-gray-700 mb-2 font-semibold">Roles</label>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center select-none hover:bg-blue-50 rounded-md overflow-hidden">
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    checked={role.isAdmin}
                                    onChange={() => setRole({ ...role, isAdmin: !role.isAdmin })}
                                    className="form-checkbox text-blue-500 h-5 w-5"
                                />
                                <label htmlFor="isAdmin" className="ml-2 text-sm text-gray-700">Admin</label>
                            </div>

                            <div className="flex items-center select-none hover:bg-blue-50 rounded-md overflow-hidden">
                                <input
                                    type="checkbox"
                                    id="isUser"
                                    checked={role.isUser}
                                    onChange={() => setRole({ ...role, isUser: !role.isUser })}
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
                    <Button onClick={handleSubmit} disabled={userCreateLoading}>
                        {
                            userCreateLoading ? <BarLoader color="#fff" /> : 'Create User'
                        }
                    </Button>
                </div>
            </form>
        </div>
    );
};
