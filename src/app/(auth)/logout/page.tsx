"use client";
import { Button } from '@/components';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function LogoutPage() {
    const router = useRouter();
    const { signOut } = useAuthContext();

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100 rounded-md">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Log out</h1>

                    <div className='space-y-6'>
                        <p className="text-gray-700">
                            Are you sure? <br />
                            You will be logged out.
                        </p>

                        <Button
                            onClick={signOut}>
                            Log out
                        </Button>

                        <button onClick={() => router.back()} className="text-blue-500 hover:text-blue-700 hover:underline">
                            Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
