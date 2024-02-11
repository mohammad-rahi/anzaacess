"use client";

import { useAuthContext } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthContext();

  const isNoWrapper = pathname == "/" || pathname == "/events" || pathname.startsWith(`/events/`);
  // const isFullWidth = pathname.startsWith("/admin") || pathname.startsWith(`/p/${user?.username}`);
  const isFullWidth = true;

  return (
    <main className={`bg-blue-50 min-h-screen ${isFullWidth ? "mt-[70px]" : "mt-[100px]"}`}>
      {
        isNoWrapper ? <>{children}</> : <div className='wrapper py-16'>
          {children}
        </div>
      }
    </main>
  )
}
