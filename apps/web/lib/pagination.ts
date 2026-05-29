const SIBLINGS = 1

const SHOW_ALL_THRESHOLD = 2 + 2 * SIBLINGS + 1 + 2

export function getPageNumbers(
  current: number,
  total: number
): (number | null)[] {
  if (total <= SHOW_ALL_THRESHOLD) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const leftSiblingStart = Math.max(2, current - SIBLINGS)
  const rightSiblingEnd = Math.min(total - 1, current + SIBLINGS)

  const showLeftEllipsis = leftSiblingStart > 2
  const showRightEllipsis = rightSiblingEnd < total - 1

  const result: (number | null)[] = [1]

  if (showLeftEllipsis) result.push(null)
  for (let p = leftSiblingStart; p <= rightSiblingEnd; p++) result.push(p)
  if (showRightEllipsis) result.push(null)

  result.push(total)
  return result
}
