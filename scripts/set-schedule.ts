/**
 * Skrypt do ustawiania grafiku salonu na podstawie grafiku pracy.
 *
 * Użycie (z plikiem):
 *   npm run set-schedule -- <rok-miesiąc> <ścieżka-do-pliku>
 *
 * Przykład:
 *   npm run set-schedule -- 2026-08 scripts/grafik.txt
 *
 * Format pliku (jeden dzień na linię):
 *   1:SO
 *   2:14-22:45
 *   3:5:30-14
 *   4:9:45-17:45
 *
 * Format dni:
 *   D:SO        → dzień wolny (godziny z harmonogramu tygodniowego)
 *   D:HH-HH:MM  → zmiana pracy (np. 14-22:45 lub 5:30-14)
 */

import { createClient } from "@supabase/supabase-js"
import * as readline from "readline"
import { resolve, isAbsolute } from "path"
import { existsSync, readFileSync } from "fs"
import { config } from "dotenv"

config({ path: resolve(__dirname, "../apps/web/.env.local") })

// ─── Konfiguracja ─────────────────────────────────────────────────────────────

/** Bufor przed wyjściem do pracy (minuty) */
const DEPARTURE_BUFFER_MIN = 30

/**
 * Jeśli zmiana zaczyna się o tej godzinie lub wcześniej → zmiana ranna
 * (salon dostępny PO pracy)
 */
const MORNING_SHIFT_MAX_START_HOUR = 12

// ─── Typy ─────────────────────────────────────────────────────────────────────

type ShiftDay = { type: "off" } | { type: "shift"; start: string; end: string }

type WorkingDay = { start: string; end: string; enabled: boolean }

type DailyOverride = {
  date: string
  start: string
  end: string
  enabled: boolean
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DAYS_PL = ["niedz", "pon", "wt", "sr", "czw", "pt", "sob"] as const

function toMin(time: string): number {
  const [h = 0, m = 0] = time.split(":").map(Number)
  return h * 60 + m
}

function fromMin(totalMin: number): string {
  const h = String(Math.floor(totalMin / 60)).padStart(2, "0")
  const m = String(totalMin % 60).padStart(2, "0")
  return `${h}:${m}`
}

function roundUpTo30Min(totalMin: number): number {
  return Math.ceil(totalMin / 30) * 30
}

function getDayKey(date: Date): string {
  return DAYS_PL[date.getDay()]!
}

function padRight(str: string, len: number): string {
  return str.length >= len ? str : str + " ".repeat(len - str.length)
}

/** Normalizuje godzinę: "6" → "06:00", "14" → "14:00", "22:45" → "22:45" */
function normalizeTime(raw: string): string {
  const trimmed = raw.trim()
  if (trimmed.includes(":")) {
    const [h, m] = trimmed.split(":")
    return `${String(Number(h)).padStart(2, "0")}:${String(m).padStart(2, "0")}`
  }
  return `${String(Number(trimmed)).padStart(2, "0")}:00`
}

// ─── Parser wejścia ───────────────────────────────────────────────────────────

/**
 * Parsuje string z dniami, np.:
 * "1:SO 2:14-22:45 3:6-14:15 4:SO"
 */
function parseScheduleInput(input: string): Map<number, ShiftDay> {
  const result = new Map<number, ShiftDay>()
  const tokens = input.trim().split(/\s+/)

  for (const token of tokens) {
    const colonIdx = token.indexOf(":")
    if (colonIdx === -1) {
      console.warn(`⚠️  Pominięto nieprawidłowy token: "${token}"`)
      continue
    }

    const dayStr = token.slice(0, colonIdx)
    const rest = token.slice(colonIdx + 1).toUpperCase()
    const day = parseInt(dayStr)

    if (isNaN(day) || day < 1 || day > 31) {
      console.warn(`⚠️  Nieprawidłowy dzień: "${dayStr}"`)
      continue
    }

    if (rest === "SO" || rest === "W" || rest === "WOLNE") {
      result.set(day, { type: "off" })
      continue
    }

    // Format: HH-HH:MM lub HH:MM-HH:MM
    const dashIdx = rest.lastIndexOf("-")
    if (dashIdx === -1) {
      console.warn(`⚠️  Nieprawidłowy format zmiany: "${token}"`)
      continue
    }

    const startRaw = rest.slice(0, dashIdx)
    const endRaw = rest.slice(dashIdx + 1)

    try {
      result.set(day, {
        type: "shift",
        start: normalizeTime(startRaw),
        end: normalizeTime(endRaw),
      })
    } catch {
      console.warn(`⚠️  Błąd parsowania godzin: "${token}"`)
    }
  }

  return result
}

// ─── Logika harmonogramu ──────────────────────────────────────────────────────

function computeSalonHours(shift: ShiftDay, weeklyDay: WorkingDay): WorkingDay {
  if (shift.type === "off") return weeklyDay

  const shiftStartMin = toMin(shift.start)
  const shiftEndMin = toMin(shift.end)

  if (shiftStartMin <= MORNING_SHIFT_MAX_START_HOUR * 60) {
    // Zmiana ranna → salon dostępny PO pracy
    const salonStartMin = roundUpTo30Min(shiftEndMin + DEPARTURE_BUFFER_MIN)
    const salonEndMin = toMin(weeklyDay.end)

    if (!weeklyDay.enabled || salonStartMin >= salonEndMin) {
      return { start: weeklyDay.start, end: weeklyDay.end, enabled: false }
    }

    return { start: fromMin(salonStartMin), end: weeklyDay.end, enabled: true }
  } else {
    // Zmiana popołudniowa → salon dostępny PRZED pracą
    const salonStartMin = toMin(weeklyDay.start)
    const salonEndMin = shiftStartMin - DEPARTURE_BUFFER_MIN

    if (!weeklyDay.enabled || salonEndMin <= salonStartMin) {
      return { start: weeklyDay.start, end: weeklyDay.end, enabled: false }
    }

    return { start: weeklyDay.start, end: fromMin(salonEndMin), enabled: true }
  }
}

// ─── Prompt CLI ───────────────────────────────────────────────────────────────

async function askConfirmation(question: string): Promise<boolean> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise((res) =>
    rl.question(question, (answer) => {
      rl.close()
      res(answer.trim().toLowerCase() !== "n")
    })
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)

  if (args.length < 2) {
    console.error(`
Użycie: npm run set-schedule -- <rok-miesiąc> <plik>

Przykład:
  npm run set-schedule -- 2026-08 scripts/grafik.txt

Format pliku (jeden dzień na linię):
  1:SO
  2:14-22:45
  3:5:30-14
`)
    process.exit(1)
  }

  const [yearMonth, inputArg] = args as [string, string]
  const [yearStr, monthStr] = yearMonth.split("-")
  const year = parseInt(yearStr!)
  const month = parseInt(monthStr!)

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    console.error("❌ Nieprawidłowy format roku-miesiąca. Przykład: 2026-08")
    process.exit(1)
  }

  // 1. Wczytaj wejście — z pliku lub inline
  let scheduleInput: string
  const filePath = isAbsolute(inputArg)
    ? inputArg
    : resolve(process.cwd(), inputArg)

  if (existsSync(filePath)) {
    scheduleInput = readFileSync(filePath, "utf-8")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .join(" ")
    console.log(`📂 Wczytano plik: ${filePath}\n`)
  } else {
    scheduleInput = inputArg
  }

  const scheduleMap = parseScheduleInput(scheduleInput)

  if (scheduleMap.size === 0) {
    console.error("❌ Nie udało się sparsować żadnych dni.")
    process.exit(1)
  }

  // 2. Pobierz harmonogram tygodniowy z bazy
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: settings, error: settingsError } = await supabase
    .from("settings")
    .select("working_hours")
    .limit(1)
    .single()

  if (settingsError || !settings) {
    console.error(
      "❌ Nie można pobrać harmonogramu z bazy:",
      settingsError?.message
    )
    process.exit(1)
  }

  const weeklyHours = settings.working_hours as Record<string, WorkingDay>

  // 3. Wylicz godziny salonu dla każdego dnia
  const overrides: DailyOverride[] = []
  const DAY_NAMES = ["Ndz", "Pon", "Wt ", "Śr ", "Czw", "Pt ", "Sob"]

  console.log(`\n📅 Grafik salonu — ${monthStr}/${yearStr}\n`)
  console.log(
    `${"Dzień".padEnd(4)} ${"Data".padEnd(12)} ${"Praca".padEnd(18)} Salon`
  )
  console.log("─".repeat(55))

  const sortedDays = [...scheduleMap.keys()].sort((a, b) => a - b)

  for (const day of sortedDays) {
    const date = new Date(year, month - 1, day)
    const dateStr = `${yearStr}-${monthStr}-${String(day).padStart(2, "0")}`
    const dayKey = getDayKey(date)
    const weeklyDay = weeklyHours[dayKey] ?? {
      start: "09:00",
      end: "17:00",
      enabled: false,
    }

    const shift = scheduleMap.get(day)!
    const salonDay = computeSalonHours(shift, weeklyDay)

    const workInfo =
      shift.type === "off" ? "SO (wolne)" : `${shift.start}–${shift.end}`

    const salonInfo = salonDay.enabled
      ? `${salonDay.start}–${salonDay.end}`
      : "ZAMKNIĘTY"

    console.log(
      `${DAY_NAMES[date.getDay()]} ${dateStr}  ${padRight(workInfo, 18)} ${salonInfo}`
    )

    overrides.push({ date: dateStr, ...salonDay })
  }

  console.log()

  // 4. Potwierdzenie
  const confirmed = await askConfirmation(
    "Zapisać ten grafik do bazy danych? [T/n]: "
  )

  if (!confirmed) {
    console.log("❌ Anulowano.")
    process.exit(0)
  }

  // 5. Upsert do daily_overrides
  const { error } = await supabase
    .from("daily_overrides")
    .upsert(overrides, { onConflict: "date" })

  if (error) {
    console.error("❌ Błąd zapisu do bazy:", error.message)
    process.exit(1)
  }

  console.log(`\n✅ Zapisano ${overrides.length} dni (${monthStr}/${yearStr}).`)
}

main().catch((err) => {
  console.error("❌ Błąd:", err instanceof Error ? err.message : err)
  process.exit(1)
})
