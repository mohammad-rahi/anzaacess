"use client";

import { useAuthContext } from '@/contexts/AuthContext';
import Image from 'next/image';
import React from 'react';

export default function ProfilePage() {
  const { user, authLoading } = useAuthContext();

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
      <div className="flex items-center mb-8">
        <Image
          src={user?.avatar_url}
          alt={user?.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div>
        {/* Additional profile details */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Additional Details</h3>
          <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          {/* Add more details as needed */}
        </div>
      </div>
    </div>
  );
}
