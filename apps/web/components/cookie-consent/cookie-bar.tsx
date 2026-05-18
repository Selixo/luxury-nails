import Link from "next/link"
import { Button } from "@workspace/ui/components/button"

type Props = {
  expanded: boolean
  onToggleExpanded: () => void
  onReject: () => void
  onConfirm: () => void
}

const ghostClass =
  "h-auto rounded-none px-0 text-xs font-light tracking-[0.15em] text-white/50 uppercase hover:bg-transparent hover:text-white/75 focus-visible:text-gold focus-visible:ring-gold/50"

export function CookieBar({
  expanded,
  onToggleExpanded,
  onReject,
  onConfirm,
}: Props) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-12 lg:px-20">
      <p className="text-xs leading-relaxed font-light text-white/60 md:max-w-lg">
        Używamy plików cookie, aby zapewnić prawidłowe działanie strony oraz —
        za Twoją zgodą — analizować ruch i personalizować treści. Więcej
        informacji w{" "}
        <Link
          href="/polityka-prywatnosci"
          className="text-white/75 underline underline-offset-2 transition-colors outline-none hover:text-gold focus-visible:text-gold"
        >
          polityce prywatności
        </Link>
        .
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="ghost"
          onClick={onToggleExpanded}
          className={ghostClass}
        >
          {expanded ? "Zwiń" : "Ustawienia"}
        </Button>

        <Button variant="ghost" onClick={onReject} className={ghostClass}>
          Odrzuć
        </Button>

        <Button
          variant="gold-fill"
          onClick={onConfirm}
          className="border-gold/50 px-5 py-2.5 text-xs tracking-widest uppercase"
        >
          <span className="relative z-10">
            {expanded ? "Zapisz ustawienia" : "Akceptuj wszystkie"}
          </span>
        </Button>
      </div>
    </div>
  )
}
