import { cn } from "@workspace/ui/lib/utils"
import { STATUS_STYLE, STATUS_LABEL } from "../constants"
import type { CalendarBooking } from "../types"

const STATUSES: CalendarBooking["status"][] = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]

export function CalendarLegend() {
  return (
    <div className="mb-4 flex flex-wrap gap-4">
      {STATUSES.map((s) => (
        <div key={s} className="flex items-center gap-1.5">
          <div
            className={cn("h-2.5 w-2.5 rounded-sm border-l-2", STATUS_STYLE[s])}
          />
          <span className="text-[10px] font-light tracking-[0.15em] text-white/50 uppercase">
            {STATUS_LABEL[s]}
          </span>
        </div>
      ))}
    </div>
  )
}
