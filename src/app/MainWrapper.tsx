"use client";

import { usePathname } from 'next/navigation';
import React from 'react';

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isHomePage = pathname == "/";

  return (
    <main className='bg-blue-50 min-h-screen mt-[72px]'>
      {
        isHomePage ? <>{children}</> : <div className='wrapper py-16'>
          {children}
        </div>
      }
    </main>
  )
}
