import { supabase } from '@/config/supabase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export type AuthType = 'login' | 'signup' | 'forgotpassword';

interface AuthHook {
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    confirmPassword: string;
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
    authLoading: boolean;
    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>
    handleSupabaseLogin: (provider: 'google' | 'apple') => Promise<void>;
    handleSubmit: () => Promise<void>;
    handleEmailExists: () => Promise<boolean>;
}

export default function useAuth(type: AuthType): AuthHook {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

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

            console.log({ data, error })

            if (data) {
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error checking if email exists:', error);
            return false;
        }
    }

    const handleSubmit = async () => {
        try {
            setAuthLoading(true);
            setError(null);

            if (type === 'signup') {
                const { data: { user }, error } = await supabase.auth.signUp({ email, password });
                if (error) {
                    throw error;
                } else {
                    const { data, error: profileError } = await supabase.from("profiles").insert({
                        name: "",
                        user_id: user?.id,
                        email,
                        avatar_url: ""
                    });

                    if (profileError) {
                        throw profileError;
                    }

                    localStorage.setItem('email', email);
                    router.push(`/signup/success?email=${email}`);
                    setAuthLoading(false);
                }
            } else if (type === 'login') {
                const { data, error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    throw error;
                } else {
                    router.push('/');
                    console.log('Supabase login successful');
                }
            }
            else if (type == "forgotpassword") {
                const { error } = await supabase.auth.resetPasswordForEmail(email);
                if (error) {
                    setAuthLoading(false);
                    throw error;
                }
            }
        } catch (error: any) {
            console.error('Authentication error:', error);
            setError(error.message || 'Authentication error');
            setAuthLoading(false);
        }
        finally {
            setAuthLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        authLoading,
        error,
        setError,
        handleSupabaseLogin,
        handleSubmit,
        handleEmailExists
    };
}
