"use client";

import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaPhone, FaChevronLeft } from "react-icons/fa6";
import useAuth, { AuthType } from './useAuth';
import Link from 'next/link';
import { BarLoader } from 'react-spinners';
import Button from '@/components/Button';
import InputField from '@/components/InputField';

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
                    else if (type == "forgotpassword" || type == "updatepassword") {
                        handleSubmit();
                    }
                }
                else {
                    if (type == "signup") {
                        setError(null);
                        setShowPasswordField(true);
                    }
                    else if (type == "login" || type == "forgotpassword") {
                        setError("User not found");
                        setShowPasswordField(false);
                    }
                }
            }).finally(() => {
                setEmailCheckLoading(false);
            })
        }
    }

    const handleValidateSubmit = () => {
        if (type == "signup" || type == "updatepassword") {
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
        <div className="min-h-screen flex items-center justify-center bg-blue-100 rounded-md">
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
                        {type === 'signup' ? 'Sign up' : type == "login" ? 'Log in' : type == "forgotpassword" ? "Forgot Password" : "Reset Password"}
                    </h2>
                </div>

                <div className="space-y-6 mt-6">
                    {
                        // (!showPasswordField && type != "forgotpassword") && (
                        //     <div>
                        //         <div className="space-y-4 mb-4">
                        //             <button
                        //                 className="flex items-center justify-center w-full bg-white border border-gray-300 font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out hover:bg-blue-50"
                        //                 onClick={() => handleSupabaseLogin('google')}
                        //             >
                        //                 <FcGoogle className="mr-2 text-2xl" />
                        //                 Continue with Google
                        //             </button>
                        //             {/* <button
                        //                 className="flex items-center justify-center w-full bg-black text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
                        //                 onClick={() => handleSupabaseLogin('apple')}
                        //             >
                        //                 <FaPhone className="mr-2 text-2xl" />
                        //                 Continue with Phone
                        //             </button> */}
                        //         </div>

                        //         <div className='flex items-center gap-2'>
                        //             <p className="h-[1px] flex-1 bg-gray-300"></p>
                        //             <p className='texxt-sm text-gray-400'>Or</p>
                        //             <p className="h-[1px] flex-1 bg-gray-300"></p>
                        //         </div>
                        //     </div>
                        // )
                    }

                    {
                        type != "updatepassword" ? (
                            <div>
                                <div className='space-y-4'>
                                    <InputField
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='Enter your email address...'
                                        label="Email"
                                    />

                                    {showPasswordField && (
                                        <InputField
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            label="Password"
                                            placeholder="Enter you password..."
                                            labelRight={
                                                <>
                                                    {
                                                        type == "login" && (
                                                            <Link href="/forgot-password" className="text-sm text-gray-700 hover:underline whitespace-nowrap">
                                                                Forgot password?
                                                            </Link>
                                                        )
                                                    }
                                                </>
                                            }
                                        />
                                    )}

                                    {(type == "signup" && showPasswordField) && (
                                        <InputField
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            label="Confirm Password"
                                            placeholder="Confirm your password..."
                                        />
                                    )}

                                    {error && (
                                        <div className="text-red-500 text-sm">{error}</div>
                                    )}

                                    {
                                        (!showPasswordField) && (
                                            <Button onClick={handleCheckEmail}>
                                                {
                                                    emailCheckLoading ? <BarLoader color='white' /> : type == "forgotpassword" ? "Reset Password" : "Continue with Email"
                                                }
                                            </Button>
                                        )
                                    }

                                    {
                                        (showPasswordField) && (
                                            <Button onClick={handleValidateSubmit}>
                                                {
                                                    authLoading ? <BarLoader color='white' /> : <>
                                                        {type === 'signup' ? 'Sign up' : 'Log in'}
                                                    </>
                                                }
                                            </Button>
                                        )
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <InputField
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="Enter you password..."
                                />

                                <InputField
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    label="Confirm Password"
                                    placeholder="Confirm your password..."
                                />

                                {error && (
                                    <div className="text-red-500 text-sm">{error}</div>
                                )}

                                <Button onClick={handleValidateSubmit}>
                                    {
                                        authLoading ? <BarLoader color='white' /> : "Update Password"
                                    }
                                </Button>
                            </div>
                        )
                    }
                </div>

                <div className="mt-8">
                    <p className="text-sm text-gray-700 text-center">
                        {type === 'signup' ? 'Already have an account?' : type === 'login' ? "Don't have an account?" : 'Remember your password?'}
                        {(type === 'signup' || type === 'forgotpassword' || type === "updatepassword") && (
                            <Link href="/login" className="text-blue-500 ml-1 hover:underline">
                                Log in
                            </Link>
                        )}
                        {type === 'login' && (
                            <Link href="/signup" className="text-blue-500 ml-1 hover:underline">
                                Sign up
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
