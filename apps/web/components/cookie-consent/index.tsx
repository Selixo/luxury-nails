"use client"

import { useState, useEffect } from "react"
import { getConsent, saveConsent } from "@/lib/consent"
import { CookieSettings, PrefKey } from "./cookie-settings"
import { CookieBar } from "./cookie-bar"

const GOLD_GRADIENT =
  "linear-gradient(to right, transparent, oklch(0.72 0.1 85 / 0.25), transparent)"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState<Record<PrefKey, boolean>>({
    analytics: false,
    marketing: false,
  })

  useEffect(() => {
    if (!getConsent()) setVisible(true)
  }, [])

  function save(values: Record<PrefKey, boolean>) {
    saveConsent(values)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Ustawienia plików cookie"
      className="fixed right-0 bottom-0 left-0 z-50"
    >
      <div
        aria-hidden="true"
        className="h-px w-full"
        style={{ background: GOLD_GRADIENT }}
      />

      <div className="bg-background-alt/95 backdrop-blur-xl">
        {expanded && (
          <CookieSettings
            prefs={prefs}
            onChange={(key, value) => setPrefs((p) => ({ ...p, [key]: value }))}
          />
        )}

        <CookieBar
          expanded={expanded}
          onToggleExpanded={() => setExpanded((v) => !v)}
          onReject={() => save({ analytics: false, marketing: false })}
          onConfirm={() =>
            save(expanded ? prefs : { analytics: true, marketing: true })
          }
        />
      </div>
    </div>
  )
}
