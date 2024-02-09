"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isNoWrapper = pathname == "/" || pathname == "/events" || pathname.startsWith(`/events/`);

  return (
    <main className='bg-blue-50 min-h-screen mt-[70px]'>
      {
        isNoWrapper ? <>{children}</> : <div className='wrapper py-16'>
          {children}
        </div>
      }
    </main>
  )
}
