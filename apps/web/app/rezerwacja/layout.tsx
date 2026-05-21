import { Providers } from "@/components/providers"

export default function RezerwacjaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
