import type { Metadata } from "next"
import { getProfileData } from "@/features/dashboard/profile/actions"
import { ProfileInfo } from "@/features/dashboard/profile/components/profile-info"
import { ChangePasswordForm } from "@/features/dashboard/profile/components/change-password-form"
import { DeleteAccountModal } from "@/features/dashboard/profile/components/delete-account-modal"

export const dynamic = "force-dynamic"

export const metadata: Metadata = { title: "Profil" }

export default async function ProfilPage() {
  const profile = await getProfileData()
  if (!profile) return null

  return (
    <div className="px-6 py-12 md:px-12 md:py-16">
      <div className="mx-auto max-w-md">
        <p className="mb-2 text-xs font-light tracking-[0.3em] text-gold uppercase">
          Konto
        </p>
        <h1 className="mb-10 font-display text-3xl font-light tracking-wide text-white sm:text-4xl">
          Twój profil
        </h1>

        <ProfileInfo {...profile} />
        <ChangePasswordForm />

        <div className="mt-10 flex justify-end border-t border-white/5 pt-6">
          <DeleteAccountModal />
        </div>
      </div>
    </div>
  )
}
