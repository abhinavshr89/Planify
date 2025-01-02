import React from 'react';
import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen backdrop-blur-sm animate-fadeIn">
            <h1 className="text-4xl font-bold text-gray-200 animate-bounce">404 - Page Not Found</h1>
            <p className="mt-4 text-lg text-gray-100 animate-pulse">
                Oops! The page you are looking for does not exist.
            </p>
            <Link href="/">
                <span className="mt-6 text-blue-500 hover:underline animate-fadeIn">Go back to Home</span>
            </Link>
        </div>
    );
};

export default NotFound;
