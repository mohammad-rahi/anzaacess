import Link from 'next/link';
import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "outline" | "primary" | "danger";
    href?: string;
}

export default function Button({ children, onClick, disabled, variant = "primary", href }: ButtonProps) {
    return (
        <>
            {
                variant === "primary" ? (
                    href ? (
                        <Link
                            href={href}
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out"
                        >
                            {children}
                        </Link>
                    ) : (
                        <button
                            onClick={onClick}
                            disabled={disabled}
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out"
                        >
                            {children}
                        </button>
                    )
                ) : (
                    variant == "outline" ? (
                        <button
                            onClick={onClick}
                            disabled={disabled}
                            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md shadow-sm text-base font-medium hover:text-white border border-blue-600 bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out text-blue-600"
                        >
                            {children}
                        </button>
                    ) :
                        (
                            <button
                                onClick={onClick}
                                disabled={disabled}
                                className="w-full inline-flex items-center justify-center px-6 py-3 rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring focus:ring-blue-200 active:bg-blue-800 transition duration-300 ease-in-out"
                            >
                                {children}
                            </button>
                        )
                )
            }
        </>
    );
}
