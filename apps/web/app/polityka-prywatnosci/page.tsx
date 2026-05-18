import type { Metadata } from "next"
import Link from "next/link"
import { SALON } from "@/config/salon"

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: `Polityka prywatności salonu ${SALON.name} — informacje o przetwarzaniu danych osobowych.`,
}

const sections = [
  {
    title: "Administrator danych",
    content: `Administratorem Twoich danych osobowych jest ${SALON.name}, z siedzibą przy ${SALON.address.street}, ${SALON.address.postalCode} ${SALON.address.city}. Kontakt: ${SALON.email}.`,
  },
  {
    title: "Jakie dane zbieramy",
    content:
      "Zbieramy wyłącznie dane niezbędne do realizacji rezerwacji wizyt: imię i nazwisko, numer telefonu, adres e-mail. Dane te podajesz dobrowolnie podczas umawiania wizyty.",
  },
  {
    title: "Cel przetwarzania danych",
    content:
      "Twoje dane przetwarzamy w celu: potwierdzenia i realizacji rezerwacji wizyty, kontaktu w sprawach dotyczących umówionej wizyty, przesyłania przypomnień o wizycie (SMS/e-mail) za Twoją zgodą.",
  },
  {
    title: "Podstawa prawna",
    content:
      "Przetwarzamy dane na podstawie art. 6 ust. 1 lit. b RODO (wykonanie umowy/rezerwacji) oraz art. 6 ust. 1 lit. a RODO (zgoda na kontakt marketingowy, jeśli wyrażona).",
  },
  {
    title: "Okres przechowywania danych",
    content:
      "Dane przechowujemy przez czas niezbędny do realizacji usługi, a następnie przez okres wymagany przepisami prawa (co do zasady nie dłużej niż 3 lata od ostatniej wizyty).",
  },
  {
    title: "Twoje prawa",
    content:
      "Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia (prawo do bycia zapomnianym), ograniczenia przetwarzania, przenoszenia danych, wniesienia sprzeciwu. W sprawach dotyczących danych skontaktuj się z nami mailowo.",
  },
  {
    title: "Cookies",
    content:
      "Strona może używać technicznych plików cookie niezbędnych do jej prawidłowego działania. Nie stosujemy plików cookie w celach śledzących ani reklamowych.",
  },
  {
    title: "Zmiany polityki",
    content:
      "Zastrzegamy sobie prawo do zmiany niniejszej polityki. Aktualna wersja jest zawsze dostępna pod tym adresem. Data ostatniej aktualizacji: styczeń 2025.",
  },
]

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-[#09090b] px-6 pt-32 pb-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-3 text-xs font-light tracking-[0.3em] text-gold uppercase">
            Dokument prawny
          </p>
          <h1 className="font-display text-3xl font-light tracking-wide text-white sm:text-4xl md:text-5xl">
            Polityka prywatności
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
