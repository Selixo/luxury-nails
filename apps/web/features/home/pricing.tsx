import { createClient } from "@/lib/supabase/server"
import type { PricingCategory } from "./config/home.constants"
import { PricingHeader } from "./components/pricing/pricing-header"
import { PricingGrid } from "./components/pricing/pricing-grid"
import { PricingNote } from "./components/pricing/pricing-note"

async function getServices(): Promise<PricingCategory[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("services")
    .select("name, price, category")
    .eq("active", true)
    .order("category")
    .order("name")

  if (!data) return []

  const grouped = new Map<string, PricingCategory>()
  for (const service of data) {
    if (!grouped.has(service.category)) {
      grouped.set(service.category, {
        id: service.category,
        label:
          service.category.charAt(0).toUpperCase() + service.category.slice(1),
        items: [],
      })
    }
    grouped.get(service.category)!.items.push({
      name: service.name,
      price: `${service.price} zł`,
    })
  }

  return Array.from(grouped.values())
}

export async function Pricing() {
  const categories = await getServices()

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 bg-background-alt px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-28"
    >
      <PricingHeader />
      <PricingGrid categories={categories} />
      <PricingNote />
    </section>
  )
}
