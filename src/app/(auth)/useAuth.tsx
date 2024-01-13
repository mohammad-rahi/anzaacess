import { supabase } from '@/config/supabase';
import React, { useState } from 'react';

export type AuthType = 'login' | 'signup';

interface AuthHook {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    
    handleSupabaseLogin: (provider: 'google' | 'apple') => Promise<void>;
    handleSubmit: () => Promise<void>;
    handleEmailExists: () => Promise<boolean>;
}

export default function useAuth(type: AuthType): AuthHook {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSupabaseLogin = async (provider: 'google' | 'apple') => {
        try {
            const { data: { url } } = await supabase.auth.signInWithOAuth({ provider });
            console.log('Supabase login successful:', url);
        } catch (error) {
            console.error('Supabase login error:', error);
        }
    };

    const handleEmailExists: () => Promise<boolean> = async () => {
        try {
            const { data, error } = await supabase.from("profiles").select("email").eq("email", email).single();

            if (error) {
                console.error('Error checking if email exists:', error);
                return false;
            }

            if (data) {
                return true;
            }
        } catch (error) {
            console.error('Error checking if email exists:', error);
            return false;
        }
        finally {
            return false;
        }
    }

    const handleSubmit = async () => {
        try {
            if (type === 'signup') {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) {
                    console.error('Supabase signup error:', error);
                } else {
                    console.log('Supabase signup successful');
                }
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
        confirmPassword,
        setConfirmPassword,
        handleSupabaseLogin,
        handleSubmit,
        handleEmailExists
    };
}
