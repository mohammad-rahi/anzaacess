export const fetchSupabase = ({ query = "", cache = "force-cache" }: { query: string, cache?: "force-cache" | "default" }) => {
    return fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${query}`, {
        headers: {
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
        },
        cache
    });
}