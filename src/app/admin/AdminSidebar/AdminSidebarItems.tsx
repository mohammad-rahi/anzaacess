type AdminSidebarItemType = {
    id: string;
    name: string;
    path: string;
    icon: JSX.Element;
}

export const AdminSidebarItems: AdminSidebarItemType[] = [
    {
        id: 'users',
        name: 'Users',
        path: '/admin/users',
        icon: <></>
    },
    {
        id: 'events',
        name: 'Events',
        path: '/admin/events',
        icon: <></>
    },
    {
        id: 'category',
        name: 'Category',
        path: '/admin/category',
        icon: <></>
    }
]