"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import type { GeoJsonObject } from "geojson"
import L from "leaflet"

interface MapViewProps {
  geoJsonData: GeoJsonObject
}

// This component is needed to update the map when geoJsonData changes
function GeoJsonUpdater({ geoJsonData }: { geoJsonData: GeoJsonObject }) {
  const map = useMap()

  useEffect(() => {
    if (geoJsonData) {
      // Fit the map to the GeoJSON bounds
      try {
        // @ts-ignore - leaflet types are not perfect
        const geoJsonLayer = L.geoJSON(geoJsonData)
        const bounds = geoJsonLayer.getBounds()
        if (bounds.isValid()) {
          map.fitBounds(bounds)
        }
      } catch (error) {
        console.error("Error fitting map to bounds:", error)
      }
    }
  }, [geoJsonData, map])

  return null
}

export default function MapView({ geoJsonData }: MapViewProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[500px] flex items-center justify-center bg-gray-100">Loading map...</div>
  }

  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <MapContainer center={[0, 0]} zoom={2} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJsonData && (
          <>
            <GeoJSON data={geoJsonData} />
            <GeoJsonUpdater geoJsonData={geoJsonData} />
          </>
        )}
      </MapContainer>
    </div>
  )
}

