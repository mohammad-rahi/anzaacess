"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();
    const notRenderFooter = pathname == "/events/new" || pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/forgot-password") || pathname.startsWith("/logout");

    return (
        <>
            {
                notRenderFooter ? null : <footer className="bg-blue-100 mt-16">
                    <div className="wrapper py-8 flex flex-col lg:flex-row justify-between items-center">
                        <div className="mb-4 lg:mb-0 text-center lg:text-left">
                            <h3 className="text-xl font-bold text-blue-800 mb-2">AnzaAccess</h3>
                            <p className="text-blue-600">Discover and book exciting events near you.</p>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-4 mt-4 lg:mt-0">
                            <Link href="/about" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                About Us
                            </Link>
                            <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                Contact
                            </Link>
                            <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                Privacy Policy
                            </Link>
                        </div>

                        <div className="border-t border-blue-200 mt-4 pt-4 text-center text-blue-600 lg:text-right">
                            <p>&copy; {new Date().getFullYear()} AnzaAccess. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            }
        </>
    );
};

export default Footer;
