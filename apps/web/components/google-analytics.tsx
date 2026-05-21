"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { getConsent, CONSENT_EVENT } from "@/lib/consent"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean
  }
}

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const sync = () => {
      const allowed = getConsent()?.analytics === true
      setEnabled(allowed)
      window[`ga-disable-${GA_ID}`] = !allowed
    }

    sync()
    window.addEventListener(CONSENT_EVENT, sync)
    window.addEventListener("storage", sync)

    return () => {
      window.removeEventListener(CONSENT_EVENT, sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  if (!enabled || !GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  )
}
