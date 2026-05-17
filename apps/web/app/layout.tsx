import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { SkipToContent } from "@/components/ui/skip-to-content"
import { SocialSidebar } from "@/components/social-sidebar"
import { StickyNav } from "@/components/sticky-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable,
        cormorant.variable
      )}
    >
      <body>
        <SkipToContent />

        <StickyNav />

        <Providers>
          <ThemeProvider>{children}</ThemeProvider>
        </Providers>

        <SocialSidebar />
      </body>
    </html>
  )
}
