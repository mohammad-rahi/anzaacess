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
        <main className='bg-white'>
            <AdminSidebar />

            <div className="wrapper min-h-screen p-8 ml-64 mt-[72px]">
                {children}
            </div>
        </main>
    )
}
