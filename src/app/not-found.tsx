"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();


    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
            <p className="text-lg mb-8">Sorry, the requested resource could not be found.</p>
            <div className='flex items-center justify-center gap-8'>
                <Link href="/" className="text-blue-500 underline cursor-pointer">Return Home
                </Link>

                <p onClick={() => router.back()} className="text-blue-500 underline cursor-pointer">Go Back
                </p>
            </div>
        </div>
    );
};

export default NotFound;
