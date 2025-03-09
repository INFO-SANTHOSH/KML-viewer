import toGeoJSON from "@mapbox/togeojson"
import type { KmlData, ElementCounts, ElementDetail } from "@/types"
import * as turf from "@turf/turf"

export async function parseKmlFile(file: File): Promise<KmlData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const kmlContent = e.target?.result as string
        const parser = new DOMParser()
        const kmlDoc = parser.parseFromString(kmlContent, "text/xml")

        // Convert KML to GeoJSON
        const geoJson = toGeoJSON.kml(kmlDoc)

        // Process the GeoJSON to extract summary and details
        const { summary, details } = processGeoJson(geoJson)

        resolve({
          geoJson,
          summary,
          details,
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsText(file)
  })
}

function processGeoJson(geoJson: any): { summary: ElementCounts; details: ElementDetail[] } {
  const summary: ElementCounts = {
    Point: 0,
    LineString: 0,
    Polygon: 0,
    MultiPoint: 0,
    MultiLineString: 0,
    MultiPolygon: 0,
    GeometryCollection: 0,
    Other: 0,
  }

  const details: ElementDetail[] = []

  // Process features
  if (geoJson.features && Array.isArray(geoJson.features)) {
    geoJson.features.forEach((feature: any) => {
      if (feature.geometry) {
        const type = feature.geometry.type

        // Update summary count
        if (type in summary) {
          summary[type as keyof ElementCounts]++
        } else {
          summary.Other++
        }

        // Calculate length for line features
        let length: number | null = null
        if (type === "LineString" || type === "MultiLineString") {
          length = calculateLength(feature)
        }

        // Extract name from properties
        const name = feature.properties?.name || feature.properties?.Name || null

        // Add to details
        details.push({
          type,
          name,
          length,
        })
      }
    })
  }

  return { summary, details }
}

function calculateLength(feature: any): number {
  try {
    // Calculate length in kilometers
    const length = turf.length(feature, { units: "kilometers" })
    return length
  } catch (error) {
    console.error("Error calculating length:", error)
    return 0
  }
}

