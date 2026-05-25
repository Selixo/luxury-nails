"use client"

import { Fragment } from "react"

type Props = {
  current: number
  total: number
}

export function StepIndicator({ current, total }: Props) {
  return (
    <div className="mb-10 flex items-center">
      {Array.from({ length: total }).map((_, i) => (
        <Fragment key={i}>
          <div className="relative flex items-center justify-center">
            {i === current && (
              <span className="absolute h-4 w-4 rounded-full bg-gold/20" />
            )}
            <div
              className={[
                "h-2 w-2 rounded-full transition-colors duration-500",
                i < current
                  ? "bg-gold"
                  : i === current
                    ? "bg-gold ring-2 ring-gold/25 ring-offset-1 ring-offset-transparent"
                    : "bg-white/15",
              ].join(" ")}
            />
          </div>

          {i < total - 1 && (
            <div className="relative mx-2 h-px flex-1 overflow-hidden bg-white/10">
              <div
                className="absolute inset-y-0 left-0 bg-gold transition-all duration-500 ease-in-out"
                style={{ width: i < current ? "100%" : "0%" }}
              />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
