"use client"

import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import { useEffect, useRef, useMemo, useCallback } from "react"

const GOLD = "#c9a96e"
const GOLD_ALPHA = "rgba(201,169,110,"

const STYLES = `
  @keyframes lx-pulse {
    0%   { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(3.5); opacity: 0; }
  }
  .lx-pulse-ring {
    animation: lx-pulse 2.2s ease-out infinite;
  }
  .lx-popup .leaflet-popup-content-wrapper {
    background: #18181b;
    border: 1px solid ${GOLD_ALPHA}0.2);
    border-radius: 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.5);
    padding: 0;
  }
  .lx-popup .leaflet-popup-tip-container { display: none; }
  .lx-popup .leaflet-popup-content { margin: 0; }
  .lx-popup .leaflet-popup-close-button {
    color: ${GOLD_ALPHA}0.7) !important;
    font-size: 14px;
    top: 6px !important;
    right: 8px !important;
  }
  .lx-popup .leaflet-popup-close-button:hover { color: ${GOLD} !important; }
  .leaflet-control-attribution {
    background: rgba(0,0,0,0.65) !important;
    color: ${GOLD_ALPHA}0.7) !important;
    font-size: 8px !important;
    border-radius: 0 !important;
  }
  .leaflet-control-attribution a { color: ${GOLD_ALPHA}0.85) !important; }
`

type Props = {
  lat: number
  lng: number
  name: string
  address: string
}

export default function LeafletMap({ lat, lng, name, address }: Props) {
  const markerRef = useRef<L.Marker>(null)

  useEffect(() => {
    const el = document.createElement("style")
    el.innerHTML = STYLES
    document.head.appendChild(el)
    return () => {
      document.head.removeChild(el)
    }
  }, [])

  const handleMarkerAdd = useCallback(() => {
    const el = markerRef.current?.getElement()
    if (!el) return
    el.setAttribute("role", "button")
    el.setAttribute("aria-label", `Lokalizacja: ${name}, ${address}`)
  }, [name, address])

  const goldPin = useMemo(
    () =>
      L.divIcon({
        html: `
          <div aria-hidden="true" style="position:relative;width:12px;height:12px">
            <div class="lx-pulse-ring" style="
              position:absolute;inset:-8px;border-radius:50%;
              background:${GOLD_ALPHA}0.2);
            "></div>
            <div style="
              width:12px;height:12px;border-radius:50%;
              background:${GOLD};
              box-shadow:0 0 0 3px ${GOLD_ALPHA}0.15),0 0 14px ${GOLD_ALPHA}0.4);
            "></div>
          </div>
        `,
        className: "",
        iconSize: [12, 12],
        iconAnchor: [6, 6],
        popupAnchor: [0, -14],
      }),
    []
  )

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={16}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker
        ref={markerRef}
        position={[lat, lng]}
        icon={goldPin}
        eventHandlers={{ add: handleMarkerAdd }}
      >
        <Popup className="lx-popup" closeButton>
          <div className="px-5 pt-3 pb-3.5">
            <p className="mb-1 text-[9px] font-light tracking-[0.3em] text-gold uppercase">
              {name}
            </p>
            <p className="text-xs leading-relaxed font-light text-white/55">
              {address}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
