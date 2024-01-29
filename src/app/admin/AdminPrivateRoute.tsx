"use client";
import React, { ReactNode } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const AdminPrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, authLoading } = useAuthContext();
    const router = useRouter();

    // If the authentication is still loading, you might want to display a loading indicator
    if (authLoading) {
        return <div>Loading...</div>;
    }

    // If there's a user and the user is an admin, render the children, otherwise, redirect to the login page
    if (user && user.id && user.roles && user.roles.isAdmin) {
        return <>{children}</>;
    } else {
        // Use the router to navigate to the login page
        router.push('/login');

        // Return null or a loading indicator while the navigation is in progress
        return null;
    }
};

export default AdminPrivateRoute;
