import type { Metadata } from 'next'
import AdminSidebar from './AdminSidebar/page'
import AdminPrivateRoute from './AdminPrivateRoute'

export const metadata: Metadata = {
    title: {
        template: '%s | AnzaAccess',
        absolute: 'Admin - AnzaAccess',
        default: 'Admin - AnzaAccess',
    },
    description: 'Admin - AnzaAccess',
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminPrivateRoute>
            <AdminSidebar />

            <div className="ml-64">
                {children}
            </div>
        </AdminPrivateRoute>
    )
}
