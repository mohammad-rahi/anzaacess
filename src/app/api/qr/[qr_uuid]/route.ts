import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { qr_uuid } }: { params: { qr_uuid: string } }) {
    try {
        // Initialize Supabase client
        const supabase = createRouteHandlerClient({ cookies }, {
            supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
        });

        // Get user information
        const { data: { user } } = await supabase.auth.getUser();

        // Check if user is authenticated
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'Unauthorized user' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if qr_uuid exists
        if (!qr_uuid) {
            return new Response(JSON.stringify({ success: false, message: 'QR Code not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get profile data
        const { data: profileData, error: profileError } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
        if (profileError) throw profileError;

        // Get booking data
        const { data: bookingInfo, error: bookingError } = await supabase.from("bookings").select("id, event_id, ticket_id, name, email, phone, event_owner_id, isUsed").eq("qr_uuid", qr_uuid).eq('event_owner_id', profileData.id).single();
        if (bookingError) throw bookingError;
        if (!bookingInfo) throw new Error('QR Code not found');

        // Get event data
        const { data: eventInfo, error: eventError } = await supabase.from("events").select("*").eq("id", bookingInfo.event_id).single();
        if (eventError) throw eventError;
        if (!eventInfo) throw new Error('Event not found');

        // Get ticket data
        const { data: ticketInfo, error: ticketError } = await supabase.from("event_tickets").select("*").eq("id", bookingInfo.ticket_id).eq("event_id", bookingInfo.event_id).single();
        if (ticketError) throw ticketError;
        if (!ticketInfo) throw new Error('Ticket not found');

        return new Response(JSON.stringify({ success: true, data: { eventInfo, ticketInfo, bookingInfo } }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('QR Code failed:', error);
        return new Response(JSON.stringify({ success: false, message: 'QR Code failed' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
