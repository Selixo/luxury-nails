"use client"

import * as React from "react"
import { DayPicker, type DayButton, type Locale } from "react-day-picker"

import { cn } from "@workspace/ui/lib/utils"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "lucide-react"
import { Button } from "@workspace/ui/components/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  captionLayout = "label",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "p-4 [--cell-radius:0px] [--cell-size:--spacing(9)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: "w-fit",
        months: "relative flex flex-col gap-4 md:flex-row",
        month: "flex w-full flex-col gap-4",
        nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between",
        button_previous:
          "flex size-(--cell-size) items-center justify-center text-white/30 transition-colors hover:text-white/60 outline-none focus-visible:text-gold aria-disabled:pointer-events-none aria-disabled:opacity-25",
        button_next:
          "flex size-(--cell-size) items-center justify-center text-white/30 transition-colors hover:text-white/60 outline-none focus-visible:text-gold aria-disabled:pointer-events-none aria-disabled:opacity-25",
        month_caption:
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
        dropdowns:
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5",
        dropdown_root: "relative",
        dropdown: "absolute inset-0 opacity-0",
        caption_label:
          "text-xs font-light tracking-[0.2em] text-white/50 uppercase select-none",
        table: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "flex-1 pb-2 text-center text-[10px] font-light tracking-widest text-white/25 uppercase select-none",
        week: "mt-1 flex w-full",
        week_number_header: "w-(--cell-size) select-none",
        week_number: "text-[0.8rem] text-white/20 select-none",
        day: "group/day relative aspect-square h-full w-full p-0 text-center select-none",
        range_start: "bg-gold/10",
        range_middle: "bg-gold/5",
        range_end: "bg-gold/10",
        today: "ring-1 ring-inset ring-white/20",
        outside: "opacity-30",
        disabled: "opacity-25 pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left")
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          if (orientation === "right")
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: ({ ...props }) => (
          <CalendarDayButton locale={locale} {...props} />
        ),
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <button
      ref={ref}
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        // Base
        "relative isolate z-10 flex aspect-square size-auto w-full min-w-(--cell-size) items-center justify-center text-xs font-light text-white/55 transition-colors outline-none",
        // Hover
        "hover:bg-white/5 hover:text-white",
        // Focus
        "focus-visible:bg-white/5 focus-visible:text-gold",
        // Focused via keyboard (react-day-picker internal)
        "group-data-[focused=true]/day:ring-1 group-data-[focused=true]/day:ring-gold/40",
        // Selected single
        "data-[selected-single=true]:bg-gold/15 data-[selected-single=true]:text-gold data-[selected-single=true]:ring-1 data-[selected-single=true]:ring-gold/40 data-[selected-single=true]:ring-inset",
        // Range
        "data-[range-start=true]:bg-gold/20 data-[range-start=true]:text-gold",
        "data-[range-end=true]:bg-gold/20 data-[range-end=true]:text-gold",
        "data-[range-middle=true]:text-white/70",
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
