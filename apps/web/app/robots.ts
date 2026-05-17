import type { MetadataRoute } from "next"
import { SALON } from "@/config/salon"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SALON.url}/sitemap.xml`,
  }
}
