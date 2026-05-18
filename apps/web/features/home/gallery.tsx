import { GalleryHeader } from "./components/gallery/gallery-header"
import { GalleryClient } from "./components/gallery/gallery-client"

export function Gallery() {
  return (
    <section
      id="galeria"
      aria-labelledby="gallery-heading"
      className="scroll-mt-20 bg-[#09090b] px-6 py-12 md:px-12 md:py-20 lg:px-20 lg:py-28"
    >
      <GalleryHeader />
      <GalleryClient />
    </section>
  )
}
