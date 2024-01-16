"use client";

import Link from 'next/link';
import React from 'react';
import { FaSignInAlt, FaPlus } from 'react-icons/fa';
import { Button } from '..';
import { usePathname } from 'next/navigation';
import AnzaAccessLogo from './AnzaAccessLogo';
import { useAuth } from '@/contexts/AuthContext';
import { HeaderMenues } from './HeaderLeftMenu';

export default function Header() {
    const pathname = usePathname();
    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.includes("/forgot-password") || pathname.includes("/logout");

    const { user, authLoading } = useAuth();

    return (
        <header className='bg-blue-100'>
            <nav className="wrapper p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-1 text-blue-600 text-3xl font-bold">
                            <AnzaAccessLogo />
                            <span className=''>AnzaAccess</span>
                        </Link>

                        {
                            !isAuthPage && (
                                <ul className="flex items-center gap-6 text-blue-600 text-lg">
                                    {
                                        HeaderMenues.map((headerMenu) => (
                                            <li key={headerMenu.id}>
                                                <Link href={headerMenu.path} className={`hover:text-blue-800 flex items-center gap-2 ${headerMenu.path == pathname ? 'text-gray-800' : ''} transition duration-300`}>
                                                    {headerMenu.name}
                                                    {
                                                        headerMenu.iconRight && (
                                                            headerMenu.iconRight
                                                        )
                                                    }
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )
                        }
                    </div>

                    {
                        (!isAuthPage && !authLoading) && (
                            <div>
                                {
                                    (user && user.email) ? <ul className="flex items-center gap-6 text-blue-600">
                                        <li>
                                            <Link href="/logout" className="text-blue-600 flex items-center hover:text-blue-800 transition duration-300 text-lg">
                                                <FaSignInAlt className="mr-2" />
                                                Log out
                                            </Link>
                                        </li>
                                    </ul> : <ul className="flex items-center gap-4 text-blue-600">
                                        <li>
                                            <Link href="/login" className="text-blue-600 flex items-center hover:text-blue-800 transition duration-300 text-lg">
                                                <FaSignInAlt className="mr-2" />
                                                Log in
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/signup">
                                                <Button>Get Started</Button>
                                            </Link>
                                        </li>
                                    </ul>
                                }
                            </div>
                        )
                    }
                </div>
            </nav>
        </header >
    );
}
