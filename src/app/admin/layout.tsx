import type { Metadata } from 'next'
import AdminSidebar from './AdminSidebar/page'

export const metadata: Metadata = {
    title: {
        template: '%s | AnzaAccess',
        absolute: 'Admin - AnzaAccess',
        default: 'Admin - AnzaAccess',
    },
    description: 'Admin - AnzaAccess',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <AdminSidebar />

            <div className="ml-64">
                {children}
            </div>
        </>
    )
}
