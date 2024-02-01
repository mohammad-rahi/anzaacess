import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClientComponentClient({
    supabaseKey,
    supabaseUrl
})



export const supabaseServer = ({ cookies }: { cookies: () => ReadonlyRequestCookies }) => createServerComponentClient({
    cookies,
}, {
    supabaseKey,
    supabaseUrl
})