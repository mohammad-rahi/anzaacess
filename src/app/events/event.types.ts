export type EventCategory = {
    id?: string;
    category_name: string;
    category_slug: string;
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
    event_date_time: string;
    event_venue: string;
    ticket_types: string;
}