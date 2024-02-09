"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import AnzaAccessLogo from './Header/AnzaAccessLogo';

const Footer = () => {
    const pathname = usePathname();

    const notRenderFooter =
        pathname == "/events/new" ||
        pathname.startsWith("/p") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/logout");

    return (
        <>
            {notRenderFooter ? null : (
                <footer className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-12">
                    <div className="wrapper">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="footer-section">
                                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/about" className="hover:underline">About Us</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:underline">Contact</Link>
                                    </li>
                                    <li>
                                        <Link href="/terms" className="hover:underline">Terms of Service</Link>
                                    </li>
                                    <li>
                                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-section">
                                <h3 className="text-lg font-bold mb-4">Explore Destinations</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <Link href="/destinations/nairobi" className="hover:underline">Nairobi</Link>
                                    </li>
                                    <li>
                                        <Link href="/destinations/mombasa" className="hover:underline">Mombasa</Link>
                                    </li>
                                    <li>
                                        <Link href="/destinations/kisumu" className="hover:underline">Kisumu</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-section">
                                <h3 className="text-lg font-bold mb-4">Connect with Us</h3>
                                <p className="mb-4">Follow us on social media for updates:</p>
                                <div className="flex space-x-4">
                                    <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                                        <FaFacebook size={24} />
                                    </a>
                                    <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                                        <FaTwitter size={24} />
                                    </a>
                                    <a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                                        <FaInstagram size={24} />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-blue-200 mt-8 pt-6 text-center text-blue-300">
                            <p>&copy; {new Date().getFullYear()} AnzaAccess. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
};

export default Footer;
