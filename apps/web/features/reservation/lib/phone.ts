export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "")
  if (digits.length === 13 && digits.startsWith("0048"))
    digits = digits.slice(4)
  else if (digits.length === 11 && digits.startsWith("48"))
    digits = digits.slice(2)
  return digits.slice(0, 9)
}

export function formatPhone(raw: string): string {
  const digits = normalizePhone(raw)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}

export function maskPhone(digits: string): string {
  return `+48 ${digits.slice(0, 3)} *** ${digits.slice(6)}`
}
