export type EventCategory = {
    id?: string;
    category_name: string;
    category_slug: string;
    created_at?: string;
}

export type TicketType = {
    id: string;
    name: string;
    description: string;
    price: number;
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
    tickets: TicketType[];
}