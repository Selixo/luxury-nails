import { cn } from "@workspace/ui/lib/utils"
import type { AdminClient } from "../types"
import type { BanActions, UnbanActions } from "../hooks/use-client-actions"
import { BanModal } from "./ban-modal"
import { UnbanModal } from "./unban-modal"
import { VISIT_TIERS } from "../constants"

function VisitsBadge({ count }: { count: number }) {
  const tier = VISIT_TIERS.find((t) => count >= t.min)
  if (!tier) return null
  return (
    <span
      className={cn(
        "border px-2 py-0.5 text-[10px] tracking-[0.15em] uppercase",
        tier.style
      )}
    >
      {tier.label}
    </span>
  )
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

type Props = {
  client: AdminClient
  banActions: BanActions
  unbanActions: UnbanActions
}

export function ClientCard({ client, banActions, unbanActions }: Props) {
  const fullName = `${client.name} ${client.lastName}`

  return (
    <article
      className={cn(
        "flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-start sm:justify-between",
        client.ban && "opacity-80"
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex flex-wrap items-center gap-2">
          <p className="text-sm font-light text-white/80">{fullName}</p>
          <VisitsBadge count={client.completedVisits} />
          {client.ban && (
            <span className="border border-red-400/30 px-2 py-0.5 text-[10px] tracking-[0.15em] text-red-400/80 uppercase">
              Zablokowana
            </span>
          )}
        </div>

        <p className="text-xs font-light text-white/50">{client.phone}</p>

        {client.ban && (
          <div className="mt-2 space-y-0.5">
            <p className="text-xs font-light break-words text-red-400/80">
              Powód: {client.ban.reason}
            </p>
            {client.ban.note && (
              <p className="text-xs font-light break-words text-white/50 italic">
                {client.ban.note}
              </p>
            )}
            <p className="text-[10px] font-light text-white/50">
              Zablokowana {formatDate(client.ban.bannedAt)}
            </p>
          </div>
        )}

        <div className="mt-2.5">
          {client.ban ? (
            <UnbanModal clientName={fullName} unbanActions={unbanActions} />
          ) : (
            <BanModal
              clientName={fullName}
              onBan={banActions.onBan}
              isPending={banActions.isPending}
              error={banActions.error}
              onClearError={banActions.onClearError}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-white/5 pt-3 sm:shrink-0 sm:items-end sm:gap-1.5 sm:border-t-0 sm:pt-0">
        <div className="text-right">
          <p className="text-lg font-light text-gold/80">
            {client.completedVisits}
          </p>
          <p className="text-[10px] font-light text-white/50">wizyt</p>
        </div>

        {client.lastVisitDate && (
          <div className="text-right">
            <p className="text-xs font-light text-white/80">
              {formatDate(client.lastVisitDate)}
            </p>
            <p className="text-[10px] font-light text-white/50">
              ostatnia wizyta
            </p>
          </div>
        )}

        <div className="text-right">
          <p className="text-xs font-light text-white/80">
            {formatDate(client.joinedAt)}
          </p>
          <p className="text-[10px] font-light text-white/50">klientka od</p>
        </div>
      </div>
    </article>
  )
}
