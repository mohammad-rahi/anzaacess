import Link from 'next/link';
import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Button } from '..';

export default function Header() {
    return (
        <header className='bg-gradient-to-r from-blue-500 to-purple-500'>
            <nav className="wrapper p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center text-white text-3xl font-bold">
                            AnzaAccess
                        </Link>

                        <ul className="flex items-center text-white text-lg">
                            <li className="mr-4">
                                <Link href="/" className="hover:text-gray-300 transition duration-300">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="hover:text-gray-300 transition duration-300">
                                    Events
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ul className="flex items-center gap-4 text-white">
                            <li>
                                <Link href="/login" className="text-white flex items-center hover:text-gray-300 transition duration-300 text-lg">
                                    <FaSignInAlt className="mr-2" />
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/signup">
                                    <Button>Get Started</Button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
