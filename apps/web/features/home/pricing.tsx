import { PricingHeader } from "./components/pricing/pricing-header"
import { PricingGrid } from "./components/pricing/pricing-grid"
import { PricingNote } from "./components/pricing/pricing-note"

export function Pricing() {
  return (
    <section
      id="cennik"
      aria-labelledby="pricing-heading"
      className="scroll-mt-20 bg-background-alt px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-28"
    >
      <PricingHeader />
      <PricingGrid />
      <PricingNote />
    </section>
  )
}
