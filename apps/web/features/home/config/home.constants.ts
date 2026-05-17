import Instagram from "@/public/icons/instagram.svg"
import Facebook from "@/public/icons/facebook.svg"
import TikTok from "@/public/icons/tiktok.svg"

export const NAV_LINKS = [
  { label: "Doświadczenie", href: "#doswiadczenie" },
  { label: "Galeria", href: "#galeria" },
  { label: "Program VIP", href: "#vip" },
  { label: "Opinie", href: "#opinie" },
  { label: "Lokalizacja", href: "#lokalizacja" },
]

export const STATS = [
  { value: "10+", label: "Zadowolonych klientek" },
  { value: "5.0 ★", label: "Średnia ocen" },
  { value: "1 rok", label: "Doświadczenia" },
]

export type ExperienceIconKey = "calendar" | "sparkles" | "star" | "history"

export type ExperienceItem = {
  number: string
  tag: string
  icon: ExperienceIconKey
  badge: { value: string; label: string }
  title: string
  description: string
  features: string[]
  image: string
  imageAlt: string
}

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    number: "01",
    tag: "Bez czekania",
    icon: "calendar",
    badge: { value: "24/7", label: "Dostępność" },
    title: "Rezerwacja Online",
    description:
      "Wybierz idealny termin w kilka sekund. Bez telefonów, bez kolejek — wszystko pod kontrolą w Twojej dłoni.",
    features: ["Wybór terminu", "Potwierdzenie SMS", "Bez kolejek"],
    image: "/experiences/nails-booking.png",
    imageAlt: "Eleganckie paznokcie — rezerwacja online w Luxury Nails",
  },
  {
    number: "02",
    tag: "Twój styl",
    icon: "sparkles",
    badge: { value: "100%", label: "Personalizacja" },
    title: "Indywidualne podejście",
    description:
      "Każda klientka jest wyjątkowa. Słuchamy, doradzamy i tworzymy look dopasowany idealnie do Ciebie i Twojej osobowości.",
    features: ["Konsultacja stylu", "Dobór kolorów", "Twój look"],
    image: "/experiences/nails-consultation.png",
    imageAlt: "Personalizowany manicure — indywidualne podejście Luxury Nails",
  },
  {
    number: "03",
    tag: "Ekskluzywnie",
    icon: "star",
    badge: { value: "VIP", label: "Program" },
    title: "Nagrody za lojalność",
    description:
      "Zbieraj punkty za każdą wizytę. Odkrywaj nagrody i przywileje zarezerwowane wyłącznie dla naszych stałych klientek.",
    features: ["Punkty za wizytę", "Ekskluzywne nagrody", "Darmowe usługi"],
    image: "/experiences/nails-vip.png",
    imageAlt:
      "Program VIP — ekskluzywne nagrody dla stałych klientek Luxury Nails",
  },
  {
    number: "04",
    tag: "Twoja historia",
    icon: "history",
    badge: { value: "100%", label: "Prywatność" },
    title: "Historia Wizyt",
    description:
      "Przeglądaj poprzednie stylizacje, odtwarzaj ulubione wzory i śledź swoją ewolucję piękna.",
    features: ["Poprzednie stylizacje", "Ulubione wzory", "Twoja ewolucja"],
    image: "/experiences/nails-history.png",
    imageAlt: "Historia wizyt — przeglądaj swoje stylizacje w Luxury Nails",
  },
]

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "TikTok", href: "#", icon: TikTok },
]
