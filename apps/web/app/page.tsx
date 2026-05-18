import { Hero } from "@/features/home/hero"
import { Experience } from "@/features/home/experience"
import { Gallery } from "@/features/home/gallery"
import { Reviews } from "@/features/home/reviews"
import { Pricing } from "@/features/home/pricing"
import { Location } from "@/features/home/location"

export default function Page() {
  return (
    <>
      <Hero />
      <main id="main-content">
        <Experience />
        <Gallery />
        <Reviews />
        <Pricing />
        <Location />
      </main>
    </>
  )
}
