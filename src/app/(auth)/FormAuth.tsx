"use client";

import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa6";
import useAuth, { AuthType } from './useAuth';
import Link from 'next/link';

type FormProps = {
    type: AuthType;
}

export default function FormAuth({ type }: FormProps) {
    const {
        handleSubmit,
        email,
        setEmail,
        password,
        setPassword,
        handleSupabaseLogin,
    } = useAuth(type);

    const [showPasswordField, setShowPasswordField] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                    {type === 'signup' ? 'Sign up' : 'Log in'}
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <button
                            className="flex items-center justify-center w-full bg-white border border-gray-300 font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => handleSupabaseLogin('google')}
                        >
                            <FcGoogle className="mr-2 text-2xl" />
                            Continue with Google
                        </button>
                        <button
                            className="flex items-center justify-center w-full bg-black text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => handleSupabaseLogin('apple')}
                        >
                            <FaApple className="mr-2 text-2xl" />
                            Continue with Apple
                        </button>
                    </div>

                    <p className="h-[1px] bg-gray-300"></p>

                    <div className='space-y-4'>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address..."
                                className="w-full border-b-2 border-blue-500 focus:outline-none focus:border-purple-500 px-3 py-2 text-gray-700 transition duration-300"
                            />
                        </div>

                        {(type == "login" || showPasswordField) && (
                            <div>
                                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password..."
                                    className="w-full border-b-2 border-blue-500 focus:outline-none focus:border-purple-500 px-3 py-2 text-gray-700 transition duration-300"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500">{error}</div>
                        )}

                        <button
                            type="submit"
                            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 ${type === 'login' && 'mt-4'}`}
                        >
                            {type === 'signup' ? 'Sign Up' : 'Log In'}
                        </button>

                        {type === "login" && (
                            <div className='text-center'>
                                <Link href="#" className="text-sm text-gray-700">
                                    Forgot password?
                                </Link>
                            </div>
                        )}
                    </div>
                </form>

                <div className="mt-8">
                    <p className="text-sm text-gray-700 text-center">
                        By {type === 'signup' ? 'signing up' : 'logging in'}, you agree to AnzaAccess&apos;s <Link href="#" className="text-blue-500">Terms</Link> and <Link href="#" className="text-blue-500">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
