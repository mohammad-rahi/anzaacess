"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/config/supabase';
import { Profile } from '@/app/(auth)/profile.types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: Profile | null;
    setUser: (user: Profile | null) => void;
    signOut: () => Promise<void>;
    authLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    signOut: async () => { },
    authLoading: true,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<Profile | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    const router = useRouter()

    useEffect(() => {
        const updateUserData = async (session: Session | null) => {
            if (session?.user) {
                try {
                    const { data: profile } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('user_id', session.user.id) // or .eq('email', session.user.email)
                        .single();

                    if (profile) {
                        setUser(profile);
                    } else {
                        if (session.user.email) {
                            const defaultProfile: Profile = {
                                user_id: session.user.id,
                                email: session.user.email,
                                name: '',
                                avatar_url: '',
                                created_at: new Date().toISOString(),
                            };

                            const { error: insertError } = await supabase
                                .from('profiles')
                                .insert([defaultProfile]);

                            if (!insertError) {
                                setUser(defaultProfile);
                            } else {
                                console.error('Error creating profile', insertError);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error fetching profile', error);
                }
            }
        };

        supabase.auth.getSession().then(({ data: { session }, error }) => {
            if (error) {
                console.error(error);
            }
            updateUserData(session);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            updateUserData(session);
        });

        setAuthLoading(false);

        // Cleanup subscription on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
        } catch (error) {
            console.error("Error logging out: ", error)
        }
        finally {
            router.push("/login")
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, signOut, authLoading }}>
            {children}
        </AuthContext.Provider>
    );
};