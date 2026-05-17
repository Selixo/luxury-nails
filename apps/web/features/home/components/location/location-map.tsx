"use client"

import dynamic from "next/dynamic"

type Props = {
  lat: number
  lng: number
  name: string
  address: string
}

const LeafletMap = dynamic(() => import("./leaflet-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-zinc-900" />,
})

export function LocationMap(props: Props) {
  return (
    <div className="relative h-[280px] overflow-hidden sm:h-[360px] lg:h-full">
      <LeafletMap {...props} />
    </div>
  )
}
