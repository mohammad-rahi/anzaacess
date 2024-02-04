"use client";

// Import necessary modules
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import AnzaAccessLogo from './Header/AnzaAccessLogo';

// Footer component
const Footer = () => {
    // Get the current pathname
    const pathname = usePathname();

    // Determine whether to render the footer or not based on the current pathname
    const notRenderFooter =
        pathname == "/events/new" ||
        pathname.startsWith("/p") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/login") ||
        pathname.startsWith("/signup") ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/logout");

    // Return the JSX for the footer
    return (
        <>
            {notRenderFooter ? null : (
                <footer className="bg-blue-100 mt-16">
                    <div className="wrapper py-12">
                        {/* Main content of the footer */}
                        <div className="flex flex-col lg:flex-row justify-between items-center">
                            {/* Footer Sections (Quick Links, Explore Destinations, Stay Connected) */}
                            <div className="lg:w-3/4 flex flex-wrap justify-between gap-8">
                                {/* Quick Links */}
                                <div className="w-full lg:w-1/4">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4">Quick Links</h3>
                                    <Link href="/about" className="text-blue-600 hover:text-blue-800 transition duration-300 block mb-2">
                                        About Us
                                    </Link>
                                    <Link href="/contact" className="text-blue-600 hover:text-blue-800 transition duration-300 block mb-2">
                                        Contact
                                    </Link>
                                    <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition duration-300 block mb-2">
                                        Terms of Service
                                    </Link>
                                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition duration-300 block">
                                        Privacy Policy
                                    </Link>
                                </div>

                                {/* Explore Destinations - Kenyan Cities */}
                                <div className="w-full lg:w-1/4">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4">Explore Destinations</h3>
                                    <Link href="/destinations/nairobi" className="text-blue-600 hover:text-blue-800 transition duration-300 block mb-2">
                                        Nairobi
                                    </Link>
                                    <Link href="/destinations/mombasa" className="text-blue-600 hover:text-blue-800 transition duration-300 block mb-2">
                                        Mombasa
                                    </Link>
                                    <Link href="/destinations/kisumu" className="text-blue-600 hover:text-blue-800 transition duration-300 block mb-2">
                                        Kisumu
                                    </Link>
                                    {/* Add more Kenyan city links as needed */}
                                </div>

                                {/* Stay Connected */}
                                <div className="w-full lg:w-1/4">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4">Connect with Us</h3>
                                    <p className="text-blue-600 mb-2">Follow us on social media for updates:</p>
                                    <div className="flex gap-4">
                                        {/* Social Media Icons */}
                                        <a href="https://www.facebook.com/your-facebook-page" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                            <FaFacebook size={24} />
                                        </a>
                                        <a href="https://twitter.com/your-twitter-handle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                            <FaTwitter size={24} />
                                        </a>
                                        <a href="https://www.instagram.com/your-instagram-page" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition duration-300">
                                            <FaInstagram size={24} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className="border-t border-blue-200 mt-8 pt-6 text-center text-blue-600 lg:text-right lg:w-full">
                            <p>&copy; {new Date().getFullYear()} AnzaAccess. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            )}
        </>
    );
};

export default Footer;
