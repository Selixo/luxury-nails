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
  ]
}
