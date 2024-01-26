"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaSignInAlt, FaUser, FaLock, FaShoppingCart } from 'react-icons/fa';
import { Button } from '..';
import { usePathname } from 'next/navigation';
import AnzaAccessLogo from './AnzaAccessLogo';
import { useAuthContext } from '@/contexts/AuthContext';
import { HeaderMenues } from './HeaderLeftMenu';
import Image from 'next/image';
import CartModal from './CartModal';

export default function Header() {
    const pathname = usePathname();

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.includes("/forgot-password") || pathname.includes("/logout");

    const { user, authLoading } = useAuthContext();

    const isFullWidth = pathname.startsWith("/admin") || pathname.startsWith(`/${user?.username}`);

    const [showCardModal, setShowCartModal] = useState<boolean>(false);

    return (
        <header className='bg-blue-100 fixed top-0 inset-x-0 z-10'>
            <nav className={`${isFullWidth ? 'w-11/12 mx-auto' : 'wrapper'} p-4`}>
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

                    <div className='flex items-center gap-8'>
                        {/* <div className='flex items-center justify-center'>
                            <button className="text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => setShowCartModal(true)}>
                                <FaShoppingCart size={24} />
                            </button>
                        </div> */}

                        {
                            (!isAuthPage && !authLoading) && (
                                <div>
                                    {
                                        (user && user.email) ? <div className='relative group'>
                                            <button className='relative w-8 h-8 rounded-md overflow-hidden bg-blue-200 cursor-pointer'>
                                                {
                                                    user.avatar_url ? <Image fill src={user.avatar_url} alt={user.name || user.email.split("@")[0]} /> : <span className='text-xl font-bold'>{user.name.slice(0, 1).toUpperCase() || user.email.split("@")[0].slice(0, 1).toUpperCase()}</span>
                                                }
                                            </button>

                                            <ul className="text-blue-600 absolute top-full right-0 whitespace-nowrap bg-white shadow-md rounded-md overflow-hidden w-64 py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto scale-y-0 group-hover:scale-y-100 origin-top transition duration-300">
                                                <li>
                                                    <Link href={`/${user.username}`} className="text-gray-800 hover:text-blue-600 flex items-center hover:bg-blue-50 transition duration-300 text-lg px-4 py-2">
                                                        <FaUser className="mr-2" />
                                                        {user.name || user.username}
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/admin/events" className="text-gray-800 hover:text-blue-600 flex items-center hover:bg-blue-50 transition duration-300 text-lg px-4 py-2">
                                                        <FaLock className="mr-2" />
                                                        Admin
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/logout" className="text-gray-800 hover:text-blue-600 flex items-center hover:bg-blue-50 transition duration-300 text-lg px-4 py-2">
                                                        <FaSignInAlt className="mr-2" />
                                                        Log out
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div> : <ul className="flex items-center gap-4 text-blue-600">
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
                </div>
            </nav>

            {
                showCardModal && (
                    <CartModal setShowCartModal={setShowCartModal} />
                )
            }
        </header >
    );
}
