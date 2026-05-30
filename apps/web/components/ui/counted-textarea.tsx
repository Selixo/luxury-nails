"use client"

import { forwardRef, useState, useCallback } from "react"
import { cn } from "@workspace/ui/lib/utils"

type Props = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "maxLength"
> & {
  maxLength: number
  /** Show counter starting from this length. Defaults to 80% of maxLength. Pass 0 to always show. */
  showCountFrom?: number
  /** Switch to red counter at this length. Defaults to 96% of maxLength. */
  warnAt?: number
  error?: string
  variant?: "modal" | "underline"
}

export const CountedTextarea = forwardRef<HTMLTextAreaElement, Props>(
  function CountedTextarea(
    {
      maxLength,
      showCountFrom,
      warnAt,
      error,
      variant = "modal",
      className,
      onChange,
      value,
      defaultValue,
      ...rest
    },
    ref
  ) {
    const threshold = showCountFrom ?? Math.floor(maxLength * 0.8)
    const warnThreshold = warnAt ?? Math.floor(maxLength * 0.96)

    const [uncontrolledCount, setUncontrolledCount] = useState(() => {
      if (typeof defaultValue === "string") return defaultValue.length
      return 0
    })

    const count = typeof value === "string" ? value.length : uncontrolledCount

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (typeof value !== "string")
          setUncontrolledCount(e.target.value.length)
        onChange?.(e)
      },
      [onChange, value]
    )

    const showCounter = count >= threshold

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          className={cn(
            "w-full resize-none text-sm font-light transition-colors outline-none placeholder:text-white/20",
            variant === "modal" &&
              "border border-white/8 bg-transparent px-3 py-2.5 text-white/60 focus:border-white/20",
            variant === "underline" &&
              "border-b border-white/15 bg-transparent pb-3 text-white placeholder:text-white/50 focus:border-gold/40",
            className
          )}
          {...rest}
        />

        <div
          className={cn(
            "flex items-center",
            variant === "modal" ? "mt-1" : "mt-1.5",
            error || showCounter ? "justify-between" : "justify-end"
          )}
        >
          {error ? (
            <p role="alert" className="text-xs font-light text-red-400/80">
              {error}
            </p>
          ) : (
            <span />
          )}

          {showCounter && (
            <p
              className={cn(
                "text-right text-[10px] font-light tabular-nums",
                count >= warnThreshold ? "text-red-400/70" : "text-white/30"
              )}
            >
              {count}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
