"use client";

import React, { useState } from 'react';
import InputField from '@/components/InputField';
import Button from '@/components/Button';
import { BarLoader } from 'react-spinners';

export default function CreateUserForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const userCreateLoading = false;

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log('User created:', { name, email, password, role });
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
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter user's role"
                        label="Role"
                    />
                </div>

                <div className='flex items-center justify-center'>
                    <Button onClick={handleSubmit} disabled={userCreateLoading}>
                        {
                            userCreateLoading ? <BarLoader color="#fff" /> : 'Create Category'
                        }
                    </Button>
                </div>
            </form>
        </div>
    )

};