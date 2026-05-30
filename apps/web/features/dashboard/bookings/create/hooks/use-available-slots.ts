"use client"

import { useEffect, useRef, useReducer, useState } from "react"
import { getAvailableSlots } from "../actions"

type State = { slots: string[]; isLoading: boolean }

type Action =
  | { type: "fetch" }
  | { type: "success"; slots: string[] }
  | { type: "error" }
  | { type: "reset" }

function reducer(_: State, action: Action): State {
  switch (action.type) {
    case "fetch":
      return { slots: [], isLoading: true }
    case "success":
      return { slots: action.slots, isLoading: false }
    case "error":
      return { slots: [], isLoading: false }
    case "reset":
      return { slots: [], isLoading: false }
  }
}

export function useAvailableSlots(
  serviceId: string,
  date: string,
  serviceDurationMin: number | undefined
) {
  const [{ slots, isLoading }, dispatch] = useReducer(reducer, {
    slots: [],
    isLoading: false,
  })
  const requestIdRef = useRef(0)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!serviceId || !date || !serviceDurationMin) {
      dispatch({ type: "reset" })
      return
    }

    const currentId = ++requestIdRef.current
    dispatch({ type: "fetch" })

    getAvailableSlots(date, serviceDurationMin)
      .then((result) => {
        if (currentId !== requestIdRef.current) return
        dispatch({ type: "success", slots: result })
      })
      .catch(() => {
        if (currentId !== requestIdRef.current) return
        dispatch({ type: "error" })
      })
  }, [serviceId, date, serviceDurationMin, refreshKey])

  function refetch() {
    setRefreshKey((k) => k + 1)
  }

  return { slots, isLoading, refetch }
}
