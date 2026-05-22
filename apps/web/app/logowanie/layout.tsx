import { Providers } from "@/components/providers"

export default function LogowanieLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
