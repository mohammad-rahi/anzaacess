export type EventCategory = {
    id?: string;
    category_name: string;
    category_slug: string;
    created_at?: string;
}

export type TicketTypes = {
    id?: string;
    event_id: string;
    profile_id: string;
    name: string;
    description: string;
    price: number;
    quantity_available: number;
    created_at?: string;
}

export type EventTypes = {
    id?: string;
    created_at?: string;
    profile_id: string;
    event_name: string;
    event_slug: string;
    event_description: string;
    event_category: EventCategory;
    event_image: string;
    event_date: string;
    event_time: string;
    event_venue: string;
    venue_description: string;
}