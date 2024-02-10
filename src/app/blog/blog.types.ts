export type BlogTypes = {
    id?: number;
    title: string;
    slug: string;
    image_url: string;
    content: string;
    status: 'published' | 'draft'
    created_at?: string;
}