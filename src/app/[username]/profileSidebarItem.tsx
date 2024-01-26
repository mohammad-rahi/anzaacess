type ProfileSidebarItemType = {
    id: string;
    name: string;
    path: (username: string) => string;
    paths: (username: string, eventID?: string, ticketID?: string) => string[];
    icon: JSX.Element;
}

export const profileSidebarItem: ProfileSidebarItemType[] = [
    {
        id: 'profile',
        name: 'Profile',
        path: (username: string) => `/${username}`,
        paths: (username: string) => [`/${username}`],
        icon: <></>
    },
    {
        id: 'events',
        name: 'Events',
        path: (username: string) => `/${username}/events`,
        paths: (username: string) => [`/${username}/events`],
        icon: <></>
    },
    {
        id: 'tickets',
        name: 'Tickets',
        path: (username: string) => `/${username}/tickets`,
        paths: (username: string, eventID?: string, ticketID?: string) => [`/${username}/tickets`, `/${username}/tickets/new`, `/${username}/tickets/edit/${eventID}/${ticketID}`],
        icon: <></>
    },
]