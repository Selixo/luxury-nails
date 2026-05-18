import { Toggle } from "./toggle"
import type { ConsentPrefs } from "@/lib/consent"

export type PrefKey = keyof Omit<ConsentPrefs, "necessary">

type Category =
  | { id: "necessary"; label: string; description: string; locked: true }
  | { id: PrefKey; label: string; description: string; locked: false }

const CATEGORIES: Category[] = [
  {
    id: "necessary",
    label: "Niezbędne",
    description:
      "Wymagane do prawidłowego działania strony. Nie mogą być wyłączone.",
    locked: true,
  },
  {
    id: "analytics",
    label: "Analityczne",
    description:
      "Pomagają zrozumieć, jak odwiedzający korzystają ze strony (np. Google Analytics).",
    locked: false,
  },
  {
    id: "marketing",
    label: "Marketingowe",
    description:
      "Używane do wyświetlania spersonalizowanych reklam i śledzenia skuteczności kampanii.",
    locked: false,
  },
]

type Props = {
  prefs: Record<PrefKey, boolean>
  onChange: (key: PrefKey, value: boolean) => void
}

export function CookieSettings({ prefs, onChange }: Props) {
  return (
    <div className="mx-auto max-w-6xl border-b border-white/5 px-6 py-6 md:px-12 lg:px-20">
      <p className="mb-5 text-xs font-light tracking-[0.2em] text-white/55 uppercase">
        Zarządzaj ustawieniami
      </p>
      <div className="flex flex-col gap-4">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className="mb-0.5 text-sm font-light text-white/70">
                {cat.label}
              </p>
              <p className="text-xs leading-relaxed font-light text-white/50">
                {cat.description}
              </p>
            </div>
            <div className="mt-0.5 shrink-0">
              {cat.locked ? (
                <Toggle
                  checked
                  disabled
                  label={`${cat.label} — zawsze aktywne`}
                />
              ) : (
                <Toggle
                  checked={prefs[cat.id]}
                  label={`Włącz cookies ${cat.label.toLowerCase()}`}
                  onChange={(v) => onChange(cat.id, v)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
