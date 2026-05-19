"use client"

import { useState, useCallback } from "react"
import { useInView } from "@/hooks/useInView"
import { ABOUT, ABOUT_STATS, CERTIFICATES } from "./config/home.constants"
import { AboutImage } from "./components/about/about-image"
import { AboutContent } from "./components/about/about-content"
import { AboutStats } from "./components/about/about-stats"
import { CertificatesLightbox } from "./components/about/certificates-lightbox"

export function About() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.15 })
  const [certIndex, setCertIndex] = useState<number | null>(null)

  const openCertificates = useCallback(() => setCertIndex(0), [])
  const closeCertificates = useCallback(() => setCertIndex(null), [])

  const prevCert = useCallback(
    () =>
      setCertIndex((i) =>
        i !== null ? (i - 1 + CERTIFICATES.length) % CERTIFICATES.length : 0
      ),
    []
  )

  const nextCert = useCallback(
    () => setCertIndex((i) => (i !== null ? (i + 1) % CERTIFICATES.length : 0)),
    []
  )

  return (
    <>
      <section
        id="o-mnie"
        ref={ref}
        className="relative scroll-mt-20 bg-background-alt px-6 py-24 md:px-12 md:py-28 lg:px-20 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-20">
            <AboutImage inView={inView} />
            <div>
              <AboutContent inView={inView} />
              <AboutStats
                stats={ABOUT_STATS}
                inView={inView}
                onCertificatesOpen={openCertificates}
              />
            </div>
          </div>
        </div>
      </section>

      <CertificatesLightbox
        items={CERTIFICATES}
        index={certIndex}
        onClose={closeCertificates}
        onPrev={prevCert}
        onNext={nextCert}
      />
    </>
  )
}
