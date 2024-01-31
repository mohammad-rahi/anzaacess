import type { Metadata } from 'next'
import AdminSidebar from './AdminSidebar/page'
import AdminPrivateRoute from './AdminPrivateRoute'
import AdminTabs from './AdminTabs'

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

            <AdminTabs />

            <div className="lg:ml-64">
                {children}
            </div>
        </AdminPrivateRoute>
    )
}
