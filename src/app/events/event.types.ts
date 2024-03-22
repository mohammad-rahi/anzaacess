export type EventCategory = {
    id?: number;
    category_name: string;
    category_slug: string;
    created_at?: string;
}

export type TicketTypes = {
    id?: number;
    event_id: number;
    profile_id: number;
    name: string;
    description: string;
    price: number;
    quantity_available: number;
    created_at?: string;
}

export type EventStatus = 'draft' | 'published';

export type EventTypes = {
    id?: number;
    created_at?: string;
    profile_id: number;
    event_name: string;
    event_slug: string;
    event_description: string;
    event_category: EventCategory;
    event_image: string;
    event_date: string;
    event_time: string;
    event_venue: string;
    venue_description: string;
    status: EventStatus;
}

export type BookingInfo = {
    event_id: number;
    ticket_id: number;
    name: string;
    email: string;
    phone: string;
}