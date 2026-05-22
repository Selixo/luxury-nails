import type { Metadata } from "next"
import { Cormorant_Garamond, Geist } from "next/font/google"

import "@workspace/ui/globals.css"
import { SALON } from "@/config/salon"
import { cn } from "@workspace/ui/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["normal", "italic"],
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL(SALON.url),

  title: {
    default: `${SALON.name} — Salon Paznokci | ${SALON.address.city}`,
    template: `%s | ${SALON.name}`,
  },
  description: SALON.description,
  keywords: [
    "salon paznokci Klenica",
    "manicure hybrydowy Klenica",
    "nail art Klenica",
    "manicure żelowy",
    "luxury nails",
    "salon kosmetyczny Klenica",
  ],

  alternates: {
    canonical: SALON.url,
  },

  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SALON.url,
    siteName: SALON.name,
    title: `${SALON.name} — Salon Paznokci | ${SALON.address.city}`,
    description: SALON.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SALON.name} — Salon Paznokci w ${SALON.address.city}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${SALON.name} — Salon Paznokci | ${SALON.address.city}`,
    description: SALON.description,
    images: ["/og-image.png"],
  },

  icons: {
    shortcut: "/favicon.ico",
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pl"
      className={cn(
        "dark font-sans antialiased",
        geist.variable,
        cormorant.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}
