export const CONSENT_KEY = "luxury-nails-consent-v1"
export const CONSENT_EVENT = "cookie-consent-updated"

export type ConsentPrefs = {
  necessary: true
  analytics: boolean
  marketing: boolean
}

function isValidConsent(value: unknown): value is ConsentPrefs {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    v.necessary === true &&
    typeof v.analytics === "boolean" &&
    typeof v.marketing === "boolean"
  )
}

export function getConsent(): ConsentPrefs | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY)
    if (!stored) return null
    const parsed: unknown = JSON.parse(stored)
    return isValidConsent(parsed) ? parsed : null
  } catch {
    console.error("Failed to get consent preferences")
    return null
  }
}

export function saveConsent(prefs: Omit<ConsentPrefs, "necessary">): void {
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ necessary: true, ...prefs })
    )
    window.dispatchEvent(new Event(CONSENT_EVENT))
  } catch {
    console.error("Failed to save consent preferences")
  }
}
