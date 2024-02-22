import { supabase } from "@/config/supabase";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params: { qr_uuid } }: { params: { qr_uuid: string } }) {
    if (req.method === 'GET') {
        try {
            const { data, error } = await supabase.from("bookings").select("event_id, ticket_id, name, email, phone, event_owner_id").eq("qr_uuid", qr_uuid).single();

            if (error) throw error;

            if (data) {
                return Response.json({ success: true, data: data }, {
                    status: 200
                });
            }
        } catch (error) {
            console.error('QR Code failed:', error);
            return Response.json({ success: false, message: 'QR Code failed' }, {
                status: 500
            });
        }
    } else {
        return Response.json({ success: false, message: 'Method not allowed' }, {
            status: 405
        });
    }
}
