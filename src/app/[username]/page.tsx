import { supabase } from '@/config/supabase';
import { notFound } from 'next/navigation';
import { Profile } from '../(auth)/profile.types';
import ProfileHeader from './ProfileHeader';

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

const fetchUserEvents = async (profile_id: string) => {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('profile_id', profile_id)

    if (error) {
      throw error;
    }
    if (data) {
      return data;
    }

  }
  catch (error) {
    console.error('Error fetching user events:', error);
  }
};

export default async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const user = await fetchUser(username);

  if (!user || !user.id) {
    notFound();
  }

  // const events = await fetchUserEvents(user.id);

  if (!user) {
    notFound();
  }
  return (
    <div>
      <ProfileHeader user={user} />
    </div>
  );
}