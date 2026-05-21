import { SALON } from "@/config/salon"
import { REVIEWS } from "@/features/home/config/home.constants"

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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
      ).toFixed(1),
      reviewCount: REVIEWS.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.text,
    })),
    sameAs: Object.values(SALON.socials),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
