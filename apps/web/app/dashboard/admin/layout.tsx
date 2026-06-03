import { getAdminBookingCounts } from "@/features/dashboard/bookings/actions"
import { AdminHeader } from "./components/admin-header"

const ZERO_COUNTS = {
  all: 0,
  pending: 0,
  confirmed: 0,
  completed: 0,
  cancelled: 0,
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const counts = await getAdminBookingCounts().catch(() => ZERO_COUNTS)

  return (
    <div className="min-h-screen bg-[#09090b]">
      <AdminHeader pendingCount={counts.pending} />
      <main id="main-content">{children}</main>
    </div>
  )
}
