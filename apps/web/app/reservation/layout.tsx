import { Providers } from "@/components/providers"

export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
