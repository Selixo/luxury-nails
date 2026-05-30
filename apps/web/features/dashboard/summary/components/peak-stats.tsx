import type { PeakStat } from "../types"

type Props = {
  days: PeakStat[]
  hours: PeakStat[]
}

const BAR_HEIGHT = 48

function PeakBars({ items }: { items: PeakStat[] }) {
  const max = Math.max(...items.map((i) => i.count), 1)

  return (
    <div className="w-full overflow-x-auto">
      <div
        className="flex items-end gap-1"
        style={{ minWidth: items.length * 36 }}
      >
        {items.map((item) => {
          const barPx = Math.round((item.count / max) * BAR_HEIGHT)
          const isTop = item.count === max && item.count > 0

          return (
            <div
              key={item.label}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <span className="text-[10px] font-light text-white/45 tabular-nums">
                {item.count > 0 ? item.count : ""}
              </span>
              <div
                className="flex w-full items-end bg-white/5"
                style={{ height: BAR_HEIGHT }}
              >
                <div
                  className={
                    isTop
                      ? "w-full bg-gold/70 transition-all duration-500"
                      : "w-full bg-white/20 transition-all duration-500"
                  }
                  style={{ height: barPx }}
                />
              </div>
              <span className="w-full truncate text-center text-[9px] font-light text-white/45">
                {item.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function PeakStats({ days, hours }: Props) {
  const noData =
    days.every((d) => d.count === 0) && hours.every((h) => h.count === 0)

  if (noData) {
    return (
      <p className="text-xs font-light text-white/45">
        Brak danych za ten miesiąc.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 text-[10px] font-light tracking-[0.2em] text-white/45 uppercase">
          Dni tygodnia
        </p>
        <PeakBars items={days} />
      </div>
      <div>
        <p className="mb-4 text-[10px] font-light tracking-[0.2em] text-white/45 uppercase">
          Godziny
        </p>
        {hours.length > 0 ? (
          <PeakBars items={hours} />
        ) : (
          <p className="text-xs font-light text-white/45">Brak danych.</p>
        )}
      </div>
    </div>
  )
}
