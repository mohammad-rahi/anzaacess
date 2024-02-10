"use client";

import Link from 'next/link'
import React from 'react'
import { profileSidebarItem } from './profileSidebarItem'
import { usePathname } from 'next/navigation'

const ProfileSidebar = ({ username, eventID, ticketID }: { username: string, eventID?: string; ticketID?: string }) => {
    const pathname = usePathname();

    return (
        <aside className="bg-blue-50 fixed inset-y-0 top-[72px] left-0 w-64 border-r border-blue-200 hidden lg:block">
            <Link href={`/${username}`} className="block p-4 text-center border-b border-blue-200">
                <h2 className="text-2xl font-bold text-blue-800">Dashboard</h2>
            </Link>
            <ul className="py-4">
                {profileSidebarItem.map((item) => (
                    <li key={item.id}>
                        <Link href={item.path(username)} className={`flex items-center py-2 px-4 hover:bg-blue-500 hover:text-blue-50 transition duration-300 ${item.paths(username, eventID, ticketID).includes(pathname) ? 'bg-blue-600 text-blue-50' : ''}`}>
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default ProfileSidebar;