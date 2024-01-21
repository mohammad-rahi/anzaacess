export interface Profile {
    id?: string
    user_id: string
    name: string
    email: string
    username: string;
    avatar_url: string
    roles: {
        isAdmin: boolean
        isUser: boolean
    }
    created_at?: string
}