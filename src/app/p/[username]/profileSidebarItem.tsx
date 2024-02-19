type ProfileSidebarItemType = {
    id: string;
    name: string;
    path: (username: string) => string;
    paths: (username: string, eventID?: string, ticketID?: string) => string[];
    icon: JSX.Element;
}

export const profileSidebarItem: ProfileSidebarItemType[] = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        path: (username: string) => `/p/${username}`,
        paths: (username: string) => [`/p/${username}`],
        icon: <></>
    },
    {
        id: 'profile',
        name: 'Profile',
        path: (username: string) => `/p/${username}/profile`,
        paths: (username: string) => [`/p/${username}/profile`],
        icon: <></>
    },
    {
        id: 'events',
        name: 'Events',
        path: (username: string) => `/p/${username}/events`,
        paths: (username: string) => [`/p/${username}/events`],
        icon: <></>
    },
    {
        id: 'tickets',
        name: 'Tickets',
        path: (username: string) => `/p/${username}/tickets`,
        paths: (username: string, eventID?: string, ticketID?: string) => [`/p/${username}/tickets`, `/p/${username}/tickets/new`, `/p/${username}/tickets/edit/${eventID}/${ticketID}`],
        icon: <></>
    },
]