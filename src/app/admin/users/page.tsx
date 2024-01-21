"use client";

import { Profile } from '@/app/(auth)/profile.types';
import { EventTypes } from '@/app/events/event.types';
import { Button } from '@/components'
import { supabase } from '@/config/supabase';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [profilesLoding, setProfilesLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from('profiles').select('*');

      if (error) {
        console.error('Error fetching users:', error);
      }

      if (data) {
        setProfiles(data);
      }

      setProfilesLoading(false);
    };

    fetchCategories();
  }, []);

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between gap-8'>
        <h1 className='text-3xl font-bold'>Users</h1>

        <div>
          <Button href="/admin/users/new">New</Button>
        </div>
      </div>

      <div>
        <ul className='space-y-4'>
          {
            profilesLoding ? (
              <Skeleton count={5} className='p-4 py-7 rounded-md shadow-sm mt-4' baseColor='white' />
            ) : (
              profiles.length > 0 ? (
                profiles.map((profile) => (
                  <li key={profile.id} className='bg-white p-4 rounded-md shadow-sm overflow-hidden flex items-center justify-between gap-8 group'>
                    <span className='font-bold'>{profile.name}</span>
                    <span className='font-bold'>{profile.email}</span>

                    <div className='group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto'>
                      <Button variant='outline' href={`/admin/users/edit/${profile.username}`}>Edit</Button>
                    </div>
                  </li>
                ))
              ) : (
                <div className='flex items-center justify-center text-sm text-gray-700 py-16'>
                  <p>No events found.</p>
                </div>
              )
            )
          }
        </ul>
      </div>
    </div>
  )
}
