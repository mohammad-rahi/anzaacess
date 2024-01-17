"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SignUpSuccessPage() {
  const [storageEmail, setStorageEmail] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    const browserEmail = localStorage.getItem("email");

    if (browserEmail?.trim() == email?.trim()) {
      setStorageEmail(browserEmail);
    }

  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 rounded-md">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {storageEmail ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Signup Successful!</h1>
            <p className="text-gray-700 mb-6">
              Thank you for signing up with <span className="font-semibold">{storageEmail}</span>.
              An email has been sent to your inbox to confirm your account.
              Please click the confirmation link in the email to complete the signup process.
            </p>
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Continue to Login
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
