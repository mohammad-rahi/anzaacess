"use client";

import React from 'react';
import { AdminSidebarItems } from './AdminSidebarItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="bg-blue-50 fixed inset-y-0 top-[72px] left-0 w-64 border-r border-blue-200">
            <Link href="/admin/events" className="block p-4 text-center border-b border-blue-200">
                <h2 className="text-2xl font-bold text-blue-800">Admin Panel</h2>
            </Link>
            <ul className="py-4">
                {AdminSidebarItems.map((item) => (
                    <li key={item.id}>
                        <Link href={item.path} className={`flex items-center py-2 px-4 hover:bg-blue-100 transition duration-300 ${pathname === item.path ? 'bg-blue-100' : ''}`}>
                            <span className="text-gray-700">{item.icon}</span>
                            <span className="ml-2 text-blue-800">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
