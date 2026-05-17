export const SALON = {
  name: "Luxury Nails",
  tagline: "Sztuka, którą nosisz",
  description:
    "Ekskluzywny salon paznokci w Klenicy. Manicure hybrydowy, żelowy i nail art wykonane z precyzją i dbałością o każdy detal. Zarezerwuj wizytę online.",
  url: "https://luxury-nails-web.vercel.app",

  phone: "+48 570033312",
  email: "kamil.naskret.dev@gmail.com",

  address: {
    street: "ul. Kręta 13",
    city: "Klenica",
    postalCode: "66-133",
    country: "PL",
    countryName: "Poland",
  },

  geo: {
    latitude: 51.9942614,
    longitude: 15.7908705,
  },

  openingHours: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      open: "09:00",
      close: "18:00",
    },
    { days: ["Saturday"], open: "09:00", close: "15:00" },
  ],

  priceRange: "$20-$100",

  socials: {
    instagram: "https://instagram.com/luxurynails",
    facebook: "https://facebook.com/luxurynails",
    tiktok: "https://tiktok.com/@luxurynails",
  },

  services: [
    "Manicure hybrydowy",
    "Manicure żelowy",
    "Nail Art",
    "Przedłużanie paznokci",
    "Zdobienia paznokci",
  ],
} as const
