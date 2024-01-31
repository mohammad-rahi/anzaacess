"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminSidebarItems } from './AdminSidebar/AdminSidebarItems';

const AdminTabs = () => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('admin');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <nav className="lg:hidden -mt-8 mb-4 pb-4 border-b border-gray-200">
            <ul className='flex items-center'>
                {AdminSidebarItems.map((item) => (
                    <li key={item.id}>
                        <Link href={item.path} onClick={() => handleTabClick(item.id)}
                            className={`flex items-center py-2 px-4 hover:bg-blue-100 transition duration-300 ${activeTab === item.id ? 'bg-blue-100' : ''}`}>
                            <span className="text-gray-700">{item.icon}</span>
                            <span className="ml-2 text-blue-800">{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default AdminTabs;