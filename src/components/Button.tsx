import Link from 'next/link';
import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "outline" | "primary" | "danger";
    href?: string;
    size?: 'sm' | 'md' | 'lg';
    type?: "button" | "submit" | "reset";
    loading?: boolean
}

export default function Button({ children, onClick, disabled, variant = "primary", href, size = 'md', type = 'button', loading = false }: ButtonProps) {
    const getSizeClass = () => {
        switch (size) {
            case 'sm':
                return 'btn-sm';
            case 'md':
                return 'btn-md';
            case 'lg':
                return 'btn-lg';
            default:
                return 'btn-md';
        }
    };

    return (
        <>
            {
                variant === "primary" ? (
                    href ? (
                        <Link
                            href={href}
                            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out whitespace-nowrap ${getSizeClass()}`}
                        >
                            {
                                loading ? 'Loading...' : children
                            }
                        </Link>
                    ) : (
                        <button
                            onClick={onClick}
                            disabled={loading || disabled}
                            type={type}
                            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out whitespace-nowrap disabled:cursor-not-allowed ${getSizeClass()}`}
                        >
                            {
                                loading ? 'Loading...' : children
                            }
                        </button>
                    )
                ) : (
                    variant == "outline" ? (
                        href ? (
                            <Link
                                href={href}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium hover:text-white border border-blue-600 bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out text-blue-600 whitespace-nowrap ${getSizeClass()}`}
                            >
                                {
                                    loading ? 'Loading...' : children
                                }
                            </Link>
                        ) : (
                            <button
                                onClick={onClick}
                                disabled={loading || disabled}
                                type={type}
                                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium hover:text-white border border-blue-600 bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out text-blue-600 whitespace-nowrap disabled:cursor-not-allowed ${getSizeClass()}`}
                            >
                                {
                                    loading ? 'Loading...' : children
                                }
                            </button>
                        )
                    ) :

                        variant == "danger" ? (
                            href ? (
                                <Link
                                    href={href}
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-red-800 transition duration-300 ease-in-out whitespace-nowrap ${getSizeClass()}`}
                                >
                                    {
                                        loading ? 'Loading...' : children
                                    }
                                </Link>
                            ) : (
                                <button
                                    onClick={onClick}
                                    disabled={loading || disabled}
                                    type={type}
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-red-400 to-red-600 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring focus:ring-red-200 active:bg-red-800 transition duration-300 ease-in-out whitespace-nowrap disabled:cursor-not-allowed ${getSizeClass()}`}
                                >
                                    {
                                        loading ? 'Loading...' : children
                                    }
                                </button>
                            )
                        ) :
                            (
                                <button
                                    onClick={onClick}
                                    disabled={loading || disabled}
                                    type={type}
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out whitespace-nowrap disabled:cursor-not-allowed ${getSizeClass()}`}
                                >
                                    {
                                        loading ? 'Loading...' : children
                                    }
                                </button>
                            )
                )
            }
        </>
    );
}
