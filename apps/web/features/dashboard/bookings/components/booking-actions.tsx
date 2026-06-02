import type { ReactNode } from "react"
import type {
  ConfirmActions,
  CompleteActions,
  CancelActions,
  NoteActions,
} from "../hooks/use-booking-actions"
import type { AdminBooking, AdminBookingStatus } from "../types"
import { CancelModal } from "./cancel-modal"
import { StylistNoteModal } from "./stylist-note-modal"
import { ActionButton } from "./action-button"

type ActionProps = {
  booking: AdminBooking
  clientName: string
  serviceName: string
  formattedDate: string
  confirmActions: ConfirmActions
  completeActions: CompleteActions
  cancelActions: CancelActions
  noteActions: NoteActions
}

const ACTIONS: Record<AdminBookingStatus, (props: ActionProps) => ReactNode> = {
  pending: ({
    clientName,
    serviceName,
    formattedDate,
    confirmActions,
    cancelActions,
  }) => (
    <div className="mt-3">
      {confirmActions.error && (
        <p role="alert" className="mb-2 text-xs text-red-400/70">
          {confirmActions.error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <ActionButton
          colorScheme="emerald"
          onClick={confirmActions.onConfirm}
          disabled={confirmActions.isPending || cancelActions.isPending}
        >
          {confirmActions.isPending ? "Potwierdzanie..." : "Potwierdź"}
        </ActionButton>
        <CancelModal
          variant="pending"
          clientName={clientName}
          serviceName={serviceName}
          date={formattedDate}
          onCancel={cancelActions.onCancel}
          isPending={cancelActions.isPending}
          error={cancelActions.error}
          onClearError={cancelActions.onClearError}
        />
      </div>
    </div>
  ),

  confirmed: ({
    clientName,
    serviceName,
    formattedDate,
    completeActions,
    cancelActions,
  }) => (
    <div className="mt-3">
      {completeActions.error && (
        <p role="alert" className="mb-2 text-xs text-red-400/70">
          {completeActions.error}
        </p>
      )}
      <div className="flex items-center gap-3">
        <ActionButton
          colorScheme="gold"
          onClick={completeActions.onComplete}
          disabled={completeActions.isPending || cancelActions.isPending}
        >
          {completeActions.isPending ? "Finalizowanie..." : "Zakończ"}
        </ActionButton>
        <CancelModal
          variant="confirmed"
          clientName={clientName}
          serviceName={serviceName}
          date={formattedDate}
          onCancel={cancelActions.onCancel}
          isPending={cancelActions.isPending}
          error={cancelActions.error}
          onClearError={cancelActions.onClearError}
        />
      </div>
    </div>
  ),

  completed: ({ booking, clientName, serviceName, noteActions }) => (
    <StylistNoteModal
      existingNote={booking.stylist_note}
      clientName={clientName}
      serviceName={serviceName}
      onSave={noteActions.onSave}
      isPending={noteActions.isPending}
      error={noteActions.error}
      onClearError={noteActions.onClearError}
    />
  ),

  cancelled: ({ booking }) =>
    booking.cancellation_reason ? (
      <p className="mt-1.5 text-xs font-light break-words text-red-400/80 italic">
        Powód anulowania: {booking.cancellation_reason}
      </p>
    ) : null,
}

export function BookingActions(props: ActionProps) {
  return <>{ACTIONS[props.booking.status](props)}</>
}
