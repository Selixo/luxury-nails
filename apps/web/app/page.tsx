import { Hero } from "@/features/home/hero"
import { Experience } from "@/features/home/experience"
import { Location } from "@/features/home/location"

export default function Page() {
  return (
    <>
      <Hero />
      <main id="main-content">
        <Experience />
        <Location />
      </main>
    </>
  )
}
