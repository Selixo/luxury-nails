import type { Metadata } from "next"
import Link from "next/link"
import { SALON } from "@/config/salon"

export const metadata: Metadata = {
  title: "Regulamin",
  description: `Regulamin salonu ${SALON.name} — zasady korzystania z usług i rezerwacji wizyt.`,
}

const sections = [
  {
    title: "Postanowienia ogólne",
    content: `Niniejszy regulamin określa zasady korzystania z usług salonu ${SALON.name}, mieszczącego się przy ${SALON.address.street}, ${SALON.address.postalCode} ${SALON.address.city}. Dokonując rezerwacji, akceptujesz postanowienia niniejszego regulaminu.`,
  },
  {
    title: "Rezerwacja wizyty",
    content:
      "Wizyty można rezerwować przez formularz online dostępny na stronie, telefonicznie lub przez wiadomość SMS. Rezerwacja jest potwierdzona po otrzymaniu potwierdzenia ze strony salonu (SMS lub e-mail). Prosimy o podanie prawidłowych danych kontaktowych.",
  },
  {
    title: "Odwoływanie i zmiana terminu",
    content:
      "Prosimy o odwoływanie lub zmianę wizyty co najmniej 24 godziny przed jej planowanym terminem. Nieodwołana wizyta może skutkować koniecznością wpłaty zadatku przy kolejnej rezerwacji. W przypadku spóźnienia powyżej 15 minut salon zastrzega sobie prawo do skrócenia wizyty lub jej odwołania.",
  },
  {
    title: "Realizacja usług",
    content:
      "Usługi wykonywane są zgodnie z aktualną ofertą i cennikiem. Ostateczna cena ustalana jest indywidualnie podczas wizyty, po ocenie stanu płytki i uzgodnieniu zakresu prac. Salon zastrzega sobie prawo do odmowy wykonania usługi, jeśli stan zdrowia klientki może stanowić przeciwwskazanie.",
  },
  {
    title: "Reklamacje",
    content:
      "Reklamacje przyjmowane są w ciągu 7 dni od daty wykonania usługi. Prosimy o kontakt telefoniczny lub mailowy z opisem problemu. Rozpatrzenie reklamacji następuje w ciągu 14 dni. Ewentualna korekta wykonywana jest bezpłatnie.",
  },
  {
    title: "Bezpieczeństwo i higiena",
    content:
      "Wszystkie narzędzia są sterylizowane lub jednorazowe. Prosimy o poinformowanie stylista o ewentualnych alergiach, chorobach skóry lub paznokci przed rozpoczęciem zabiegu. W przypadku widocznych zmian chorobowych salon może odmówić wykonania usługi.",
  },
  {
    title: "Płatności",
    content:
      "Płatności przyjmowane są gotówką lub przelewem. Cennik dostępny jest na stronie internetowej i w salonie. Salon wystawia potwierdzenie płatności na życzenie klientki.",
  },
  {
    title: "Postanowienia końcowe",
    content:
      "Salon zastrzega sobie prawo do zmiany regulaminu. Aktualny regulamin dostępny jest zawsze pod tym adresem oraz w salonie. W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają przepisy Kodeksu cywilnego. Data ostatniej aktualizacji: styczeń 2025.",
  },
]

export default function Regulamin() {
  return (
    <div className="min-h-screen bg-[#09090b] px-6 pt-32 pb-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-xs font-light tracking-[0.3em] text-gold uppercase">
            Dokument prawny
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
            Regulamin salonu
          </h1>
          <div aria-hidden="true" className="mt-6 h-px w-full bg-white/5" />
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xs font-light tracking-[0.2em] text-white/50 uppercase">
                {String(i + 1).padStart(2, "0")} — {section.title}
              </h2>
              <p className="text-sm leading-relaxed font-light text-white/40">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Back link */}
        <div aria-hidden="true" className="mt-14 h-px w-full bg-white/5" />
        <div className="mt-8">
          <Link
            href="/"
            className="text-xs font-light tracking-[0.2em] text-white/30 uppercase transition-colors outline-none hover:text-gold focus-visible:text-gold"
          >
            ← Wróć na stronę główną
          </Link>
        </div>
      </div>
    </div>
  )
}
