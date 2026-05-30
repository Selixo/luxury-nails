import { cn } from "@workspace/ui/lib/utils"
import { formatBookingDate, type AdminBooking } from "../types"
import type {
  ConfirmActions,
  CompleteActions,
  CancelActions,
  NoteActions,
} from "../hooks/use-booking-actions"
import { BookingActions } from "./booking-actions"
import { InspirationPreview } from "./inspiration-preview"
import { STATUS_STYLE, STATUS_LABEL } from "../constants"

type Props = {
  booking: AdminBooking
  confirmActions: ConfirmActions
  completeActions: CompleteActions
  cancelActions: CancelActions
  noteActions: NoteActions
}

export function BookingCard({
  booking,
  confirmActions,
  completeActions,
  cancelActions,
  noteActions,
}: Props) {
  const { client, service } = booking
  const clientName = `${client.name} ${client.last_name}`
  const formattedDate = formatBookingDate(booking.date)

  return (
    <article className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="text-sm font-light text-white/85">{clientName}</p>
          <span
            className={cn(
              "border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
              STATUS_STYLE[booking.status]
            )}
          >
            {STATUS_LABEL[booking.status]}
          </span>
        </div>

        <p className="text-xs font-light text-white/60">{service.name}</p>
        <p className="mt-0.5 text-xs font-light text-white/55">
          {client.phone}
        </p>

        {booking.notes && (
          <p className="mt-1.5 text-xs font-light text-white/50 italic">
            {booking.notes}
          </p>
        )}

        {booking.inspiration_url && (
          <InspirationPreview url={booking.inspiration_url} />
        )}

        <BookingActions
          booking={booking}
          clientName={clientName}
          serviceName={service.name}
          formattedDate={formattedDate}
          confirmActions={confirmActions}
          completeActions={completeActions}
          cancelActions={cancelActions}
          noteActions={noteActions}
        />
      </div>

      <div className="shrink-0 text-right">
        <p className="text-xs font-light text-white/55">{formattedDate}</p>
        <p className="mt-0.5 text-sm font-light text-white/70">
          {booking.time}
        </p>
        <p className="mt-1 text-xs font-light text-gold/80">
          {service.price} zł
        </p>
      </div>
    </article>
  )
}
