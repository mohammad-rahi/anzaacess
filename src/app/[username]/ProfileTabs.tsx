"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function ProfileTabs({ username }: { username: string }) {
    const pathname = usePathname();

    if (pathname == `/${username}/edit`) {
        return null;
    }

    return (
        <div className="flex bg-white rounded-md shadow-md overflow-hidden mt-4">
            <Link href={`/${username}`} className={`text-blue-600 hover:text-blue-800 transition duration-300 p-4 cursor-pointer ${pathname == `/${username}` && 'bg-blue-100'}`}
            >
                Events
            </Link>
            <Link href={`/${username}/tickets`} className={`text-blue-600 hover:text-blue-800 transition duration-300 p-4 cursor-pointer ${pathname == `/${username}/tickets` && 'bg-blue-100'}`}
            >
                Tickets
            </Link>
        </div>
    )
}
