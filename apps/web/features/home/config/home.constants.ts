import Instagram from "@/public/icons/instagram.svg"
import Facebook from "@/public/icons/facebook.svg"
import TikTok from "@/public/icons/tiktok.svg"

export const NAV_LINKS = [
  { label: "Galeria", href: "#gallery" },
  { label: "O mnie", href: "#about" },
  { label: "Doświadczenie", href: "#experience" },
  { label: "Opinie", href: "#reviews" },
  { label: "Cennik", href: "#pricing" },
  { label: "Lokalizacja", href: "#location" },
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
    image: "/experiences/nails-booking.jpg",
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
    image: "/experiences/nails-consultation.jpg",
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
    image: "/experiences/nails-vip.jpg",
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
    image: "/experiences/nails-history.jpg",
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
    src: "/works/work-1.png",
    alt: "Praca Luxury Nails",
    category: "hybryda",
    size: "tall",
    service: "Hybryda",
  },
  {
    id: "g02",
    alt: "Praca Luxury Nails",
    category: "zel",
    size: "normal",
    service: "Żel",
  },
  {
    id: "g03",
    alt: "Praca Luxury Nails",
    category: "nail-art",
    size: "tall",
    service: "Nail Art",
  },
  {
    id: "g04",
    alt: "Praca Luxury Nails",
    category: "przedluzanie",
    size: "normal",
    service: "Przedłużanie",
  },
  {
    id: "g05",
    alt: "Praca Luxury Nails",
    category: "manicure",
    size: "normal",
    service: "Manicure",
  },
  {
    id: "g06",
    alt: "Praca Luxury Nails",
    category: "hybryda",
    size: "normal",
    service: "Hybryda",
  },
  {
    id: "g07",
    alt: "Praca Luxury Nails",
    category: "zel",
    size: "tall",
    service: "Żel",
  },
  {
    id: "g08",
    alt: "Praca Luxury Nails",
    category: "nail-art",
    size: "normal",
    service: "Nail Art",
  },
  {
    id: "g09",
    alt: "Praca Luxury Nails",
    category: "przedluzanie",
    size: "normal",
    service: "Przedłużanie",
  },
  {
    id: "g10",
    alt: "Praca Luxury Nails",
    category: "manicure",
    size: "tall",
    service: "Manicure",
  },
  {
    id: "g11",
    alt: "Praca Luxury Nails",
    category: "hybryda",
    size: "normal",
    service: "Hybryda",
  },
  {
    id: "g12",
    alt: "Praca Luxury Nails",
    category: "zel",
    size: "normal",
    service: "Żel",
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

export type AboutStat = {
  value: string
  label: string
  clickable?: boolean
}

export type CertificateItem = {
  id: string
  src?: string
  alt: string
  name: string
  issuer: string
  year: string
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "cert-01",
    src: "/certificates/cerificate-indigo-manicure.png",
    alt: "Certyfikat szkolenia Indigo Nails — Manicure",
    name: "Manicure",
    issuer: "Indigo Nails",
    year: "2025",
  },
  {
    id: "cert-02",
    src: "/certificates/certificate-indigo-manicure-2.png",
    alt: "Certyfikat szkolenia Indigo Nails — Manicure",
    name: "Manicure",
    issuer: "Indigo Nails",
    year: "2025",
  },
]

export const ABOUT = {
  ownerName: "Martyna Rydlicka",
  headline: "Pasja, która stała się rzemiosłem",
  lead: "Paznokcie to dla mnie nie tylko praca — to forma wyrazu, w której każdy detal ma znaczenie. Od lat tworzę stylizacje, które łączą precyzję z estetyką i są skrojone dokładnie pod potrzeby każdej klientki.",
  body: "Pracuję wyłącznie na sprawdzonych materiałach renomowanych marek i stale poszerzam swoje umiejętności na certyfikowanych szkoleniach. Każda wizyta to dla mnie nie tylko usługa — to chwila, w której Ty jesteś w centrum uwagi.",
  image: "/me.jpg",
  imageAlt: "Właścicielka Luxury Nails",
}

export const ABOUT_STATS: AboutStat[] = [
  { value: "1+", label: "Lat doświadczenia" },
  { value: "100%", label: "Certyfikowane szkolenia", clickable: true },
  { value: "Klenica", label: "Mała miejscowość, wielka pasja" },
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
