"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/features/reservation/actions"

type Props = {
  className?: string
  children?: React.ReactNode
}

export function SignOutButton({ className, children }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSignOut() {
    startTransition(async () => {
      const { error } = await signOut()
      if (error) {
        console.error("signOut error:", error)
      }
      router.push("/reservation")
      router.refresh()
    })
  }

  return (
    <button onClick={handleSignOut} disabled={isPending} className={className}>
      {children ?? (isPending ? "Wylogowuję..." : "Wyloguj")}
    </button>
  )
}
