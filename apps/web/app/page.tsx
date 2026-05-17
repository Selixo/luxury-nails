import { Hero } from "@/features/home/hero"
import { Experience } from "@/features/home/experience"

export default function Page() {
  return (
    <>
      <Hero />
      <main id="main-content">
        <Experience />
      </main>
    </>
  )
}
