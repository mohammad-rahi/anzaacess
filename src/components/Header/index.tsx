"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { HiXMark, HiUser, HiLockClosed, HiChevronDown, HiPlus } from 'react-icons/hi2';
import { Button } from '..';
import { usePathname } from 'next/navigation';
import AnzaAccessLogo from './AnzaAccessLogo';
import { useAuthContext } from '@/contexts/AuthContext';
import { HeaderMenues } from './HeaderLeftMenu';
import Image from 'next/image';
import CartModal from './CartModal';
import { HiMenuAlt3 } from 'react-icons/hi';

export default function Header() {
    const pathname = usePathname();

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.includes("/forgot-password") || pathname.includes("/logout");

    const { user, authLoading } = useAuthContext();

    const isFullWidth = pathname.startsWith("/admin") || pathname.startsWith(`/p/${user?.username}`);

    const [showCardModal, setShowCartModal] = useState<boolean>(false);
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

    return (
        <header className='bg-blue-100 fixed top-0 inset-x-0 z-50'>
            <nav className={`${isFullWidth ? 'w-11/12 mx-auto' : 'wrapper'} p-4 py-2`}>
                <div className="flex items-center justify-between gap-8">
                    <Link href="/" className="flex items-center gap-1 text-blue-600 text-2xl md:text-3xl font-bold hover:text-blue-800 transition duration-300">
                        <AnzaAccessLogo />
                    </Link>

                    <div className='flex items-center justify-center'>
                        {!isAuthPage && (
                            <ul className="hidden lg:flex items-center text-blue-600 space-x-4">
                                {HeaderMenues.map((headerMenu) => (
                                    <li key={headerMenu.id}>
                                        <Link href={headerMenu.path} className={`hover:bg-blue-200 px-3 py-1 rounded-md flex items-center ${headerMenu.path === pathname ? 'border border-blue-600' : ''} transition duration-300`}>
                                            {headerMenu.name}
                                            {headerMenu.iconRight && <span className="ml-2">{headerMenu.iconRight}</span>}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="flex items-center gap-8">
                        {/* <div className='flex items-center justify-center'>
                            <button className="text-blue-600 hover:text-blue-800 focus:outline-none" onClick={() => setShowCartModal(true)}>
                                <FaShoppingCart size={24} />
                            </button>
                        </div> */}

                        <div>
                            <button className={`hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-md flex items-center gap-2 transition duration-300`}>List your property <HiPlus /></button>
                        </div>

                        {
                            (!isAuthPage && !authLoading) && (
                                <div>
                                    {
                                        (user && user.email) ? <div className='relative group hidden lg:block'>
                                            <button className='flex items-center gap-1' onClick={() => setShowProfileMenu(!showProfileMenu)}>
                                                <div className="relative w-8 h-8 rounded-md overflow-hidden bg-blue-200 cursor-pointer">
                                                    {
                                                        user.avatar_url ? <Image fill src={user.avatar_url} alt={user.name || user.email.split("@")[0]} /> : <span className='text-xl font-bold'>{user.name.slice(0, 1).toUpperCase() || user.email.split("@")[0].slice(0, 1).toUpperCase()}</span>
                                                    }
                                                </div>

                                                <HiChevronDown className='w-4 h-4' />
                                            </button>

                                            {
                                                showProfileMenu && (
                                                    <>
                                                        <ul className="text-blue-600 absolute top-full right-0 whitespace-nowrap bg-white shadow-md rounded-md overflow-hidden w-64 py-1 z-10" onClick={() => setShowProfileMenu(false)}>
                                                            <li>
                                                                <Link href={`/p/${user.username}`} className="text-gray-800 hover:bg-blue-200 flex items-center transition duration-300 px-4 py-2">
                                                                    <HiUser className="mr-2" />
                                                                    {user.name || user.username}
                                                                </Link>
                                                            </li>
                                                            {
                                                                user.roles.isAdmin && (
                                                                    <li>
                                                                        <Link href="/admin/events" className="text-gray-800 hover:bg-blue-200 flex items-center transition duration-300 px-4 py-2">
                                                                            <HiLockClosed className="mr-2" />
                                                                            Admin
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                            <li>
                                                                <Link href="/logout" className="text-gray-800 hover:bg-blue-200 flex items-center transition duration-300 px-4 py-2">
                                                                    <FaSignInAlt className="mr-2" />
                                                                    Log out
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <div className="fixed top-0 right-0 bottom-0 left-0" onClick={() => setShowProfileMenu(false)}></div>
                                                    </>
                                                )
                                            }


                                        </div> : <ul className="hidden lg:flex items-center gap-4 text-blue-600">
                                            <li>
                                                <Link href="/login">
                                                    <Button size='sm'>Log in</Button>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/signup">
                                                    <Button size='sm'>Get Started</Button>
                                                </Link>
                                            </li>
                                        </ul>
                                    }
                                </div>
                            )
                        }

                        <div className="lg:hidden">
                            <div className="cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full" onClick={() => setShowMobileMenu(true)}>
                                <HiMenuAlt3 className='w-6 h-6 text-blue-600 hover:text-blue-800' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* {
                    !isFullWidth && (
                        <div className='flex items-center justify-center'>
                            {!isAuthPage && (
                                <ul className="hidden lg:flex items-center text-blue-600 text-lg space-x-4">
                                    {HeaderMenues.map((headerMenu) => (
                                        <li key={headerMenu.id}>
                                            <Link href={headerMenu.path} className={`hover:bg-blue-200 px-3 py-1 rounded-md flex items-center gap-2 ${headerMenu.path === pathname ? 'border border-blue-600' : ''} transition duration-300`}>
                                                {headerMenu.name}
                                                {headerMenu.iconRight && <span className="ml-2">{headerMenu.iconRight}</span>}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                } */}
            </nav>

            {
                showCardModal && (
                    <CartModal setShowCartModal={setShowCartModal} />
                )
            }

            {
                showMobileMenu && (
                    <>
                        <div className='fixed inset-0 bg-black/25 backdrop-blur-sm lg:hidden' onClick={() => setShowMobileMenu(false)}>
                            <div className='bg-white h-full w-1/2 min-w-60 fixed right-0' onClick={(ev) => ev.stopPropagation()}>
                                <div className='border-b border-gray-100 flex items-center justify-between gap-8 px-8 py-2'>
                                    <h3 className='text-xl font-bold'>Menu</h3>

                                    <div className='cursor-pointer w-10 h-10 flex justify-center items-center hover:bg-[rgba(0_0_0_/_10%)] transition duration-200 rounded-full' onClick={() => setShowMobileMenu(false)}>
                                        <HiXMark className='w-6 h-6' />
                                    </div>
                                </div>

                                <div className='text-blue-600 text-base space-y-4 py-4'>
                                    <ul>
                                        {
                                            HeaderMenues.map((headerMenu) => (
                                                <li key={headerMenu.id}>
                                                    <Link href={headerMenu.path} onClick={() => setShowMobileMenu(false)} className={`hover:text-blue-800 flex items-center gap-2 ${headerMenu.path == pathname ? 'text-gray-800' : ''} transition duration-300 px-8 py-2 hover:bg-blue-50`}>
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

                                    <div className='w-full h-[1px] bg-gray-100'></div>

                                    {
                                        user ? (
                                            <ul>
                                                <li>
                                                    <Link onClick={() => setShowMobileMenu(false)} href={`/p/${user.username}`} className={`hover:text-blue-800 flex items-center gap-2 ${`/p/${user.username}` == pathname ? 'text-gray-800' : ''} transition duration-300 px-8 py-2 hover:bg-blue-50`}>
                                                        {user.name || user.username}
                                                    </Link>
                                                </li>
                                                {
                                                    user.roles.isAdmin && (
                                                        <li>
                                                            <Link onClick={() => setShowMobileMenu(false)} href="/admin/events" className={`hover:text-blue-800 flex items-center gap-2 ${`/p/${user.username}` == pathname ? 'text-gray-800' : ''} transition duration-300 px-8 py-2 hover:bg-blue-50`}>
                                                                Admin
                                                            </Link>
                                                        </li>
                                                    )
                                                }
                                                <li>
                                                    <Link onClick={() => setShowMobileMenu(false)} href="/logout" className={`hover:text-blue-800 flex items-center gap-2 ${`/p/${user.username}` == pathname ? 'text-gray-800' : ''} transition duration-300 px-8 py-2 hover:bg-blue-50`}>
                                                        Log out
                                                    </Link>
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul className="flex flex-col gap-4 text-blue-600 px-8">
                                                <li>
                                                    <Link href="/login">
                                                        <Button size='sm'>Log in</Button>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link href="/signup">
                                                        <Button size='sm'>Get Started</Button>
                                                    </Link>
                                                </li>
                                            </ul>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </header >
    );
}