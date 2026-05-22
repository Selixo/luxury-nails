"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "@/app/logowanie/actions"

type Props = {
  className?: string
  children?: React.ReactNode
}

export function SignOutButton({ className, children }: Props) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function handleSignOut() {
    startTransition(async () => {
      await signOut()
      router.push("/logowanie")
      router.refresh()
    })
  }

  return (
    <button onClick={handleSignOut} disabled={isPending} className={className}>
      {children ?? (isPending ? "Wylogowuję..." : "Wyloguj")}
    </button>
  )
}
