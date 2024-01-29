"use client";
import { usePathname, useRouter } from 'next/navigation';

import React, { ReactNode } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, authLoading } = useAuthContext();
    const router = useRouter();
    const pathname = usePathname();

    // If the authentication is still loading, you might want to display a loading indicator
    if (authLoading) {
        return <div>Loading...</div>;
    }

    // If there's a user, render the children, otherwise, redirect to the login page
    if (user && user.id) {
        return <>{children}</>;
    } else {
        // Use the router to navigate to the login page
        router.push(`/login?destination=${pathname}`);

        // Return null or a loading indicator while the navigation is in progress
        return null;
    }
};

export default PrivateRoute;
