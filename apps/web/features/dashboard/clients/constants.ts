import type { FilterOption } from "@/components/ui/filters-nav"
import type { ClientFilter } from "./types"

export const CLIENTS_LIMIT = 20

export const CLIENT_FILTERS: FilterOption<ClientFilter>[] = [
  { id: "all", label: "Wszystkie" },
  { id: "active", label: "Aktywne" },
  { id: "banned", label: "Zablokowane" },
]

export const VISIT_TIERS = [
  { min: 10, label: "Stała klientka", style: "border-gold/35 text-gold/80" },
  {
    min: 5,
    label: "Lojalna",
    style: "border-emerald-400/25 text-emerald-400/80",
  },
  { min: 3, label: "Regularna", style: "border-white/15 text-white/50" },
] as const
