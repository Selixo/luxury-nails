import dynamic from "next/dynamic"
import { JsonLd } from "@/components/seo/json-ld"
import { SkipToContent } from "@/components/ui/skip-to-content"
import { Footer } from "@/components/footer"
import { SocialSidebar } from "@/components/social-sidebar"
import { StickyNav } from "@/components/sticky-nav"

const CookieConsent = dynamic(() =>
  import("@/components/cookie-consent").then((m) => m.CookieConsent)
)

const GoogleAnalytics = dynamic(() =>
  import("@/components/google-analytics").then((m) => m.GoogleAnalytics)
)

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd />
      <SkipToContent />
      <StickyNav />
      {children}
      <GoogleAnalytics />
      <Footer />
      <CookieConsent />
      <SocialSidebar />
    </>
  )
}
