import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getActiveBan } from "@/features/dashboard/actions"
import { BannedScreen } from "../../../features/reservation/components/banned-screen"
import { ClientNav } from "@/features/dashboard/components/client-nav"

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

export default async function KlientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/reservation")

  const ban = await getActiveBan(user.id)

  if (ban) {
    return (
      <BannedScreen reason={ban.reason} bannedAt={formatDate(ban.banned_at)} />
    )
  }

  return <ClientNav>{children}</ClientNav>
}
