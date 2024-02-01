"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/config/supabase';

const AdminPrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { user, authLoading } = useAuthContext();
    const router = useRouter();
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (user && user.id) {
                try {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('user_id', user.id)
                        .single();

                    if (error) {
                        console.error('Error fetching user data:', error);
                        return;
                    }

                    if (data && data.roles && data.roles.isAdmin) {
                        // User is an admin, do nothing
                    } else {
                        // User is not an admin, redirect to login
                        router.push('/login');
                    }
                } catch (error) {
                    console.error('Error checking admin status:', error);
                } finally {
                    setAuthLoaded(true);
                }
            }
        };

        if (!authLoading) {
            checkAdminStatus();
        }
    }, [authLoading, user, router]);

    // If the authentication is still loading, or admin status is being checked, display a loading indicator
    if (!authLoaded || authLoading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AdminPrivateRoute;
