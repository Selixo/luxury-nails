import { PRICING_CATEGORIES } from "../../config/home.constants"
import { PricingCategoryCard } from "./pricing-category"

export function PricingGrid() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
      {PRICING_CATEGORIES.map((category, i) => (
        <PricingCategoryCard key={category.id} category={category} index={i} />
      ))}
    </div>
  )
}
