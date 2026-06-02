import { ServiceRow } from "./service-row"
import { AddServiceModal } from "./add-service-modal"
import type { ServiceRow as ServiceRowType } from "../types"

type Props = {
  services: ServiceRowType[]
}

export function ServicesSection({ services }: Props) {
  const categories = groupByCategory(services)
  const existingCategories = [...new Set(services.map((s) => s.category))]

  return (
    <section>
      <h2 className="mb-1 text-sm font-light tracking-[0.2em] text-white/60 uppercase">
        Cennik usług
      </h2>
      <p className="mb-5 text-xs font-light text-white/50">
        Ceny i czas trwania wyświetlane klientkom przy rezerwacji. Dezaktywowane
        usługi nie są widoczne podczas umawiania wizyty.
      </p>

      <div className="flex flex-col divide-y divide-white/5 border border-white/8">
        {categories.map(({ category, items }) => (
          <div key={category}>
            <div className="border-b border-white/5 bg-white/[0.015] px-5 py-2">
              <p className="text-[10px] font-light tracking-[0.25em] text-white/45 uppercase">
                {category}
              </p>
            </div>
            {items.map((service) => (
              <ServiceRow key={service.id} service={service} />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <AddServiceModal existingCategories={existingCategories} />
      </div>
    </section>
  )
}

function groupByCategory(
  services: ServiceRowType[]
): { category: string; items: ServiceRowType[] }[] {
  const map = new Map<string, ServiceRowType[]>()
  for (const s of services) {
    const existing = map.get(s.category)
    if (existing) {
      existing.push(s)
    } else {
      map.set(s.category, [s])
    }
  }
  return Array.from(map.entries()).map(([category, items]) => ({
    category,
    items,
  }))
}
