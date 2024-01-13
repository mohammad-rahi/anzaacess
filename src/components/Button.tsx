import React from 'react';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out focus:outline-none focus:shadow-outline transform hover:scale-105"
        >
            {children}
        </button>
    );
}
