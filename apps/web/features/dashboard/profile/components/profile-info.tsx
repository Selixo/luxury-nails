import type { ProfileData } from "../actions"

function formatJoinedDate(iso: string): string {
  return new Intl.DateTimeFormat("pl-PL", {
    month: "long",
    year: "numeric",
  }).format(new Date(iso))
}

type Props = Pick<ProfileData, "name" | "lastName" | "phone" | "joinedAt">

export function ProfileInfo({ name, lastName, phone, joinedAt }: Props) {
  const rows = [
    { label: "Imię i nazwisko", value: `${name} ${lastName}` },
    { label: "Numer telefonu", value: phone },
    { label: "Klientka od", value: formatJoinedDate(joinedAt) },
  ]

  return (
    <div className="mb-10 border border-white/8">
      <ul className="flex flex-col divide-y divide-white/5">
        {rows.map(({ label, value }) => (
          <li
            key={label}
            className="flex items-center justify-between px-6 py-4"
          >
            <p className="text-xs font-light tracking-[0.15em] text-white/50 uppercase">
              {label}
            </p>
            <p className="text-sm font-light text-white/70">{value}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
