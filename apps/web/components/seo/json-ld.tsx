import { SALON } from "@/config/salon"

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: SALON.name,
    description: SALON.description,
    url: SALON.url,
    telephone: SALON.phone,
    email: SALON.email,
    priceRange: SALON.priceRange,
    image: `${SALON.url}/og-image.png`,
    logo: `${SALON.url}/icon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SALON.address.street,
      addressLocality: SALON.address.city,
      postalCode: SALON.address.postalCode,
      addressCountry: SALON.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SALON.geo.latitude,
      longitude: SALON.geo.longitude,
    },
    openingHoursSpecification: SALON.openingHours.flatMap(
      ({ days, open, close }) =>
        days.map((day) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${day}`,
          opens: open,
          closes: close,
        }))
    ),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi",
      itemListElement: SALON.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
        },
      })),
    },
    sameAs: Object.values(SALON.socials),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
