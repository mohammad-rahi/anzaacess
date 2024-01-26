import type { Metadata } from 'next'
import { supabase } from '@/config/supabase';
import { Profile } from '../(auth)/profile.types';
import ProfileHeader from './ProfileHeader';
import ProfileSidebar from './ProfileSidebar';

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
    params: { username, event_id, ticket_id }
}: {
    children: React.ReactNode,
    params: { username: string, event_id: string, ticket_id: string }
}) {

    // const user = await fetchUser(username);

    return (
        <>
            <ProfileSidebar username={username} eventID={event_id} ticketID={ticket_id} />

            <div className="ml-64">
                {children}
            </div>
        </>
    )
}
