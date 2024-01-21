import type { Metadata } from 'next'
import Image from 'next/image'
import ProfileTabs from './ProfileTabs'
import { supabase } from '@/config/supabase';
import { Profile } from '../(auth)/profile.types';
import Link from 'next/link';
import ProfileHeader from './ProfileHeader';
import { userAgentFromString } from 'next/server';

const fetchUser: (username: string) => Promise<Profile> = async (username: string) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .single();

        if (error) {
            throw error;
        }
        if (data) {
            return data;
        }
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

// export const metadata: Metadata = {
//     title: {
//         template: '%s | AnzaAccess`,
//         absolute: `${user.username} - AnzaAccess`,
//         default: `${user.username} - AnzaAccess`,
//     },
//     description: `${user.username} - AnzaAccess`,
// }

export default async function ProfileLayout({
    children,
    params: { username }
}: {
    children: React.ReactNode,
    params: { username: string }
}) {

    const user = await fetchUser(username);

    return (
        <div className='max-w-4xl mx-auto space-y-8'>
            <ProfileHeader user={user} />
            <ProfileTabs username={username} />

            <div>
                {children}
            </div>
        </div>
    )
}
