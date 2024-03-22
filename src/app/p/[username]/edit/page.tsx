"use client";

import CreateUserForm from '@/app/admin/users/new/CreateUserForm';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa';

export default function ProfileEditPage({ params: { username } }: { params: { username: string } }) {
    const router = useRouter();
    const pathname = usePathname();

    const isEditOwnProfile = pathname === `/${username}/edit`;

    return (
        <div className='space-y-12'>
            <div className='flex items-center'>
                <button title='Go back' className='p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300' onClick={() => router.back()}>
                    <FaChevronLeft />
                </button>

                <div className='flex-1 text-center'>
                    <h1 className="text-4xl font-bold text-center text-blue-600">Edit Organizer Profile</h1>
                </div>
            </div>

            <CreateUserForm username={username} isEditOwnProfile={isEditOwnProfile} />
        </div>
    )
}
