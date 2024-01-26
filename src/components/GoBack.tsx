"use client";

import { useRouter } from 'next/navigation'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa';

const GoBack = () => {
    const router = useRouter();

    return (
        <button title='Go back' className='p-2 bg-blue-100 rounded-md hover:bg-blue-200 transition duration-300' onClick={() => router.back()}>
            <FaChevronLeft />
        </button>
    )
}

export default GoBack