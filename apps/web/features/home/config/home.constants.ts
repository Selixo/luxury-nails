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

export type Review = {
  author: string
  avatar?: string
  rating: number
  text: string
  date: string
  service: string
}

export const REVIEWS: Review[] = [
  {
    author: "Aleksandra W.",
    rating: 5,
    text: "Absolutnie najlepszy salon, w jakim byłam. Hybryd trzyma się idealnie już od czterech tygodni, a efekt wygląda jak pierwszego dnia. Polecam każdej, która szuka prawdziwej jakości.",
    date: "Kwiecień 2025",
    service: "Manicure hybrydowy",
  },
  {
    author: "Karolina M.",
    rating: 5,
    text: "Wyjątkowe podejście do klientki i niesamowita precyzja. Zamówiłam nail art i byłam w szoku, jak dokładnie zostało wykonane. Efekt przeszedł moje oczekiwania — na pewno wracam!",
    date: "Marzec 2025",
    service: "Nail Art",
  },
  {
    author: "Natalia B.",
    rating: 5,
    text: "Rezerwacja przez internet jest super wygodna, zero czekania. Salon jest przepiękny, a obsługa niesamowita w swoim fachu. Moje paznokcie nigdy nie wyglądały tak pięknie.",
    date: "Marzec 2025",
    service: "Manicure żelowy",
  },
  {
    author: "Monika P.",
    rating: 5,
    text: "Przyszłam po raz pierwszy i zostałam na stałe. Profesjonalizm, czystość, miła atmosfera i efekt, który zachwyca moje koleżanki. Nie wyobrażam sobie teraz innego salonu.",
    date: "Luty 2025",
    service: "Przedłużanie paznokci",
  },
  {
    author: "Zuzanna K.",
    rating: 5,
    text: "Świetne doradztwo i wykonanie na najwyższym poziomie. Pomoc w wyborze idealnego koloru i wzoru pod mój styl. Wynik piękny, elegancki i trwały — wracam regularnie.",
    date: "Luty 2025",
    service: "Manicure hybrydowy",
  },
]
