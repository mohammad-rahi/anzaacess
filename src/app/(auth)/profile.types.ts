export interface Profile {
    id?: number
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