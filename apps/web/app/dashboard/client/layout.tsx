import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { BannedScreen } from "./_components/banned-screen"
import { KlientNav } from "./_components/klient-nav"

export default async function KlientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const supabase = await createClient()
  // let user = null
  // try {
  //   const { data } = await supabase.auth.getUser()
  //   user = data.user
  // } catch {
  //   redirect("/reservation")
  // }

  // if (!user) redirect("/reservation")

  // const { data: ban } = await supabase
  //   .from("bans")
  //   .select("reason, note, banned_at")
  //   .eq("client_id", user.id)
  //   .maybeSingle()

  // if (ban) {
  //   const bannedAt = new Intl.DateTimeFormat("pl-PL", {
  //     day: "numeric",
  //     month: "long",
  //     year: "numeric",
  //   }).format(new Date(ban.banned_at))

  //   return (
  //     <BannedScreen
  //       reason={ban.reason}
  //       note={ban.note ?? undefined}
  //       bannedAt={bannedAt}
  //     />
  //   )
  // }

  return <KlientNav>{children}</KlientNav>
}
