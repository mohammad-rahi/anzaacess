import { supabase } from '@/config/supabase';
import React, { useState } from 'react';

export type AuthType = 'login' | 'signup';

interface AuthHook {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    handleSupabaseLogin: (provider: 'google' | 'apple') => Promise<void>;
    handleSubmit: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function useAuth(type: AuthType): AuthHook {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSupabaseLogin = async (provider: 'google' | 'apple') => {
        try {
            const { data: { url } } = await supabase.auth.signInWithOAuth({ provider });
            console.log('Supabase login successful:', url);
        } catch (error) {
            console.error('Supabase login error:', error);
        }
    };

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        try {
            if (type === 'signup') {
                // Add signup logic here
            } else if (type === 'login') {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) {
                    console.error('Supabase login error:', error);
                } else {
                    console.log('Supabase login successful');
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSupabaseLogin,
        handleSubmit,
    };
}
