import Instagram from "@/public/icons/instagram.svg"
import Facebook from "@/public/icons/facebook.svg"
import TikTok from "@/public/icons/tiktok.svg"

export const NAV_LINKS = [
  { label: "Doświadczenie", href: "#doswiadczenie" },
  { label: "Galeria", href: "#galeria" },
  { label: "Cennik", href: "#cennik" },
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
    tag: "Najwyższa jakość",
    icon: "star",
    badge: { value: "100%", label: "Jakość" },
    title: "Sprawdzone materiały",
    description:
      "Pracuję wyłącznie na produktach renomowanych marek. Twoje paznokcie są w dobrych rękach — od preparacji po ostatni detal.",
    features: ["Marki premium", "Trwały efekt", "Bezpieczne składniki"],
    image: "/experiences/nails-vip.png",
    imageAlt:
      "Produkty premium używane w Luxury Nails — jakość i bezpieczeństwo",
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

export type PricingItem = {
  name: string
  price: string
}

export type PricingCategory = {
  id: string
  label: string
  items: PricingItem[]
}

export type GalleryCategory =
  | "hybryda"
  | "zel"
  | "nail-art"
  | "przedluzanie"
  | "manicure"

export type GallerySize = "normal" | "tall"

export type GalleryItem = {
  id: string
  src?: string
  alt: string
  category: GalleryCategory
  size: GallerySize
  service: string
}

export const GALLERY_FILTERS = [
  { id: "all" as const, label: "Wszystkie" },
  { id: "hybryda" as const, label: "Hybryda" },
  { id: "zel" as const, label: "Żel" },
  { id: "nail-art" as const, label: "Nail Art" },
  { id: "przedluzanie" as const, label: "Przedłużanie" },
  { id: "manicure" as const, label: "Manicure" },
] as const

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g01",
    src: "https://picsum.photos/seed/nails-french/600/900",
    alt: "Manicure hybrydowy french",
    category: "hybryda",
    size: "tall",
    service: "Hybryda French",
  },
  {
    id: "g02",
    src: "https://picsum.photos/seed/nails-nude/800/600",
    alt: "Żel na naturalną płytkę nude",
    category: "zel",
    size: "normal",
    service: "Żel nude",
  },
  {
    id: "g03",
    src: "https://picsum.photos/seed/nails-art3d/600/900",
    alt: "Nail art kwiaty 3D",
    category: "nail-art",
    size: "tall",
    service: "Nail Art 3D",
  },
  {
    id: "g04",
    src: "https://picsum.photos/seed/nails-tips/800/600",
    alt: "Przedłużanie tipsami mleczne",
    category: "przedluzanie",
    size: "normal",
    service: "Przedłużanie tipsami",
  },
  {
    id: "g05",
    src: "https://picsum.photos/seed/nails-classic/800/600",
    alt: "Manicure klasyczny czerwony",
    category: "manicure",
    size: "normal",
    service: "Manicure klasyczny",
  },
  {
    id: "g06",
    src: "https://picsum.photos/seed/nails-chrome/800/600",
    alt: "Hybryda z pyłkiem chrome",
    category: "hybryda",
    size: "normal",
    service: "Hybryda chrome",
  },
  {
    id: "g07",
    src: "https://picsum.photos/seed/nails-ombre/600/900",
    alt: "Żel z gradientem ombre",
    category: "zel",
    size: "tall",
    service: "Żel ombre",
  },
  {
    id: "g08",
    src: "https://picsum.photos/seed/nails-gold/800/600",
    alt: "Nail art geometryczny złoty",
    category: "nail-art",
    size: "normal",
    service: "Nail Art złoty",
  },
  {
    id: "g09",
    src: "https://picsum.photos/seed/nails-gel-sq/800/600",
    alt: "Przedłużanie żelem kwadrat",
    category: "przedluzanie",
    size: "normal",
    service: "Przedłużanie żelem",
  },
  {
    id: "g10",
    src: "https://picsum.photos/seed/nails-manicure/600/900",
    alt: "Manicure z malowaniem nude",
    category: "manicure",
    size: "tall",
    service: "Manicure nude",
  },
  {
    id: "g11",
    src: "https://picsum.photos/seed/nails-holo/800/600",
    alt: "Hybryda z foliami holograficznymi",
    category: "hybryda",
    size: "normal",
    service: "Hybryda folia",
  },
  {
    id: "g12",
    src: "https://picsum.photos/seed/nails-stones/800/600",
    alt: "Żel z kamieniami",
    category: "zel",
    size: "normal",
    service: "Żel z kamieniami",
  },
]

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: "manicure",
    label: "Manicure",
    items: [
      { name: "Manicure klasyczny", price: "od 60 zł" },
      { name: "Manicure z malowaniem lakierem", price: "od 70 zł" },
      { name: "Manicure z hybrydą", price: "od 110 zł" },
      { name: "Ściąganie hybrydy", price: "od 40 zł" },
    ],
  },
  {
    id: "przedluzanie",
    label: "Przedłużanie",
    items: [
      { name: "Przedłużanie żelem", price: "od 180 zł" },
      { name: "Przedłużanie na tipsach", price: "od 160 zł" },
      { name: "Rekonstrukcja / korekta", price: "od 130 zł" },
      { name: "Ściąganie żelu / tipsów", price: "od 50 zł" },
    ],
  },
  {
    id: "zele-hybrydy",
    label: "Żele & Hybrydy",
    items: [
      { name: "Żel na naturalną płytkę", price: "od 140 zł" },
      { name: "Hybryda klasyczna", price: "od 100 zł" },
      { name: "Hybryda z zdobieniem", price: "od 120 zł" },
      { name: "Naprawa pojedynczego paznokcia", price: "od 20 zł" },
    ],
  },
  {
    id: "zdobienia",
    label: "Zdobienia",
    items: [
      { name: "Zdobienie proste (1–2 palce)", price: "od 20 zł" },
      { name: "Zdobienie kompleksowe", price: "wycena indywidualna" },
      { name: "Pyłek / folia / efekt chrome", price: "od 15 zł" },
      { name: "Kamyczki, naklejki", price: "od 10 zł" },
    ],
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
