"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import CreateUserForm from '../../new/CreateUserForm';

export default function EditUserPage({ params: { username } }: { params: { username: string } }) {
  const router = useRouter();

  return (
    <div className='space-y-12'>
      <div className='flex items-center'>
        <button title='Go back' className='p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300' onClick={() => router.back()}>
          <FaChevronLeft />
        </button>

        <div className='flex-1 text-center'>
          <h1 className="text-4xl font-bold text-center text-blue-600">Edit User: {username}</h1>
        </div>
      </div>

      <CreateUserForm username={username} />
    </div>
  );
}
