import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res }, {
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
  })

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = req.nextUrl.pathname;

  const destination = req.nextUrl.searchParams.get('destination');

  // if user is signed in and the current path is auth-pages redirect the user to destination or /
  if (user && ['/login', '/signup', '/forgot-password'].includes(pathname)) {
    return NextResponse.redirect(new URL(destination || '/', req.url));
  }

  // if user is not signed in and the current path is not /logout redirect the user to /login
  if (!user && pathname == "/logout") {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // if user is not signed in and the current path is private routes (/events/new, /events/edit, /p, /admin) redirect the user to /login
  if (!user && ['/events/new', '/events/edit', '/p', '/admin'].some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(`/login?destination=${pathname}`, req.url));
  }

  // Admin routes
  if (user) {
    const { data, error } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();

    if (error) {
      console.error('Error fetching user:', error);
    }

    if (data && data.roles.isAdmin) {
      return res;
    } else if (['/admin'].some(path => pathname.startsWith(path))) {
      // Redirect to a different route if the user is not an admin
      return NextResponse.redirect(new URL(`/p/${data.username}`, req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/login', '/signup', '/forgot-password', '/logout', '/events/new', '/events/edit/:path*', '/p/:path*', '/admin/:path*'],
}