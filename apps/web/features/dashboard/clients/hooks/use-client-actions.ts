"use client"

import { useState, useTransition } from "react"
import { banClient, unbanClient } from "../actions"

export type BanActions = {
  onBan: (reason: string, note: string) => void
  isPending: boolean
  error: string | null
  onClearError: () => void
}

export type UnbanActions = {
  onUnban: () => void
  isPending: boolean
  error: string | null
}

export function useClientActions() {
  const [banPendingId, setBanPendingId] = useState<string | null>(null)
  const [banErrors, setBanErrors] = useState<Map<string, string>>(new Map())
  const [, startBanTransition] = useTransition()

  const [unbanPendingId, setUnbanPendingId] = useState<string | null>(null)
  const [unbanErrors, setUnbanErrors] = useState<Map<string, string>>(new Map())
  const [, startUnbanTransition] = useTransition()

  function getActions(
    clientId: string,
    banId: string | null
  ): {
    ban: BanActions
    unban: UnbanActions
  } {
    return {
      ban: {
        isPending: banPendingId === clientId,
        error: banErrors.get(clientId) ?? null,
        onBan(reason, note) {
          setBanPendingId(clientId)
          startBanTransition(async () => {
            const { error } = await banClient(clientId, reason, note)
            setBanPendingId(null)
            if (error)
              setBanErrors((prev) => new Map(prev).set(clientId, error))
          })
        },
        onClearError() {
          setBanErrors((prev) => {
            const next = new Map(prev)
            next.delete(clientId)
            return next
          })
        },
      },

      unban: {
        isPending: unbanPendingId === clientId,
        error: unbanErrors.get(clientId) ?? null,
        onUnban() {
          if (!banId) return
          setUnbanPendingId(clientId)
          startUnbanTransition(async () => {
            const { error } = await unbanClient(banId)
            setUnbanPendingId(null)
            if (error)
              setUnbanErrors((prev) => new Map(prev).set(clientId, error))
          })
        },
      },
    }
  }

  return { getActions }
}
