import { Providers } from "@/components/providers"

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
