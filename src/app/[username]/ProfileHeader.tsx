"use client";

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Profile } from '../(auth)/profile.types'
import { usePathname } from 'next/navigation'

export default function ProfileHeader({ user }: { user: Profile }) {
    const pathname = usePathname();

    if(pathname == `/${user.username}/edit`) {
        return null;
    }

    return (
        <div className="bg-white p-8 rounded-md shadow-md overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image
                        src={user.avatar_url}
                        alt={user.name}
                        className="rounded-full mr-4"
                        width={48}
                        height={48}
                    />
                    <div>
                        <h2 className="text-3xl font-bold">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <Link href={`/${user.username}/edit`} className="text-blue-600 hover:text-blue-800 font-semibold">
                    Edit Profile
                </Link>
            </div>
        </div>
    )
}
