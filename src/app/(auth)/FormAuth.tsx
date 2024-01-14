"use client";

import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaPhone, FaChevronLeft } from "react-icons/fa6";
import useAuth, { AuthType } from './useAuth';
import Link from 'next/link';
import { BarLoader } from 'react-spinners';

type FormProps = {
    type: AuthType;
}

const isValidEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
};

export default function FormAuth({ type }: FormProps) {
    const {
        handleSubmit,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        authLoading,
        error,
        setError,
        handleSupabaseLogin,
        handleEmailExists
    } = useAuth(type);

    const [showPasswordField, setShowPasswordField] = useState(false);
    const [emailCheckLoading, setEmailCheckLoading] = useState(false);


    const handleCheckEmail = () => {
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address');
        } else {
            setError(null);
            setEmailCheckLoading(true);

            handleEmailExists().then((exists) => {
                if (exists) {
                    if (type == "signup") {
                        setError('Email already exists');
                    }
                    else if (type == "login") {
                        setError(null);
                        setShowPasswordField(true);
                    }
                    else if (type == "forgotpassword") {
                        handleSubmit();
                    }
                }
                else {
                    if (type == "signup") {
                        setError(null);
                        setShowPasswordField(true);
                    }
                    else if (type == "login" || type == "forgotpassword") {
                        setError("Email does not exist");
                        setShowPasswordField(false);
                    }
                }
            }).finally(() => {
                setEmailCheckLoading(false);
            })
        }
    }

    const handleValidateSubmit = () => {
        if (type == "signup") {
            if (password) {
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                } else {
                    setError(null);
                    handleSubmit();
                }
            } else {
                setError('Please enter a password');
            }
        } else {
            handleSubmit();
        }
    }

    const handleBackToSignUp = () => {
        setShowPasswordField(false);
        setError(null);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <div className='flex items-center'>
                    {
                        (showPasswordField) && (
                            <button onClick={handleBackToSignUp} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                                <FaChevronLeft />
                            </button>
                        )
                    }

                    <h2 className="text-3xl font-extrabold text-center text-gray-800 flex-1">
                        {type === 'signup' ? 'Sign up' : type == "login" ? 'Log in' : "Forgot Password"}
                    </h2>
                </div>

                <div className="space-y-6 mt-6">
                    {
                        (!showPasswordField && type != "forgotpassword") && (
                            <div>
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
                                        <FaPhone className="mr-2 text-2xl" />
                                        Continue with Phone
                                    </button>
                                </div>

                                <p className="h-[1px] bg-gray-300"></p>
                            </div>
                        )
                    }

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
                                onChange={(e) => setEmail(e.target.value.trim())}
                                placeholder="Enter your email address..."
                                className="w-full border-b-2 border-blue-500 focus:outline-none focus:border-purple-500 px-3 py-2 text-gray-700 transition duration-300"
                            />
                        </div>

                        {showPasswordField && (
                            <div>
                                <div className='flex items-center justify-between gap-8'>
                                    <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                                        Password
                                    </label>

                                    {
                                        type == "login" && (
                                            <Link href="/forgot-password" className="text-sm text-gray-700 hover:underline">
                                                Forgot password?
                                            </Link>
                                        )
                                    }
                                </div>

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

                        {(type == "signup" && showPasswordField) && (
                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm your password..."
                                    className="w-full border-b-2 border-blue-500 focus:outline-none focus:border-purple-500 px-3 py-2 text-gray-700 transition duration-300"
                                />
                            </div>
                        )}

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}

                        {
                            (!showPasswordField) && (
                                <button
                                    onClick={handleCheckEmail}
                                    disabled={emailCheckLoading}
                                    type="button"
                                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer`}
                                >
                                    {
                                        emailCheckLoading ? <BarLoader color='white' /> : type == "forgotpassword" ? "Reset Password" : "Continue with Email"
                                    }
                                </button>
                            )
                        }

                        {
                            (showPasswordField) && (
                                <button
                                    type="button"
                                    onClick={handleValidateSubmit}
                                    disabled={authLoading}
                                    className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105`}
                                >
                                    {
                                        authLoading ? <BarLoader color='white' /> : <>
                                            {type === 'signup' ? 'Sign up' : 'Log in'}
                                        </>
                                    }
                                </button>
                            )
                        }
                    </div>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-gray-700 text-center">
                        {type === 'signup' ? 'Already have an account?' : type === 'login' ? "Don't have an account?" : 'Remember your password?'}
                        {type === 'signup' && (
                            <Link href="/login" className="text-blue-500 ml-1 hover:underline">
                                Log in
                            </Link>
                        )}
                        {type === 'login' && (
                            <Link href="/signup" className="text-blue-500 ml-1 hover:underline">
                                Sign up
                            </Link>
                        )}
                        {type === 'forgotpassword' && (
                            <Link href="/login" className="text-blue-500 ml-1 hover:underline">
                                Log in
                            </Link>
                        )}
                    </p>
                </div>

                <div className="mt-8">
                    <p className="text-sm text-gray-700 text-center">
                        By {type === 'signup' ? 'signing up' : 'logging in'}, you agree to AnzaAccess&apos;s <Link href="#" className="text-blue-500 hover:underline">Terms</Link> and <Link href="#" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
}
