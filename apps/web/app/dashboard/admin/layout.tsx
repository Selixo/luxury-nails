import { getAdminBookingCounts } from "@/features/dashboard/bookings/actions"
import { AdminHeader } from "./components/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const counts = await getAdminBookingCounts()

  return (
    <div className="min-h-screen bg-[#09090b]">
      <AdminHeader pendingCount={counts.pending} />
      <main id="main-content">{children}</main>
    </div>
  )
}
