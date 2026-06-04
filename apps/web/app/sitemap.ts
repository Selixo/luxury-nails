import type { MetadataRoute } from "next"
import { SALON } from "@/config/salon"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SALON.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SALON.url}/rezerwacja`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SALON.url}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SALON.url}/statute`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ]
}
