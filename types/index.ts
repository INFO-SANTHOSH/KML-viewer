import type { GeoJsonObject } from "geojson"

export interface ElementCounts {
  Point: number
  LineString: number
  Polygon: number
  MultiPoint: number
  MultiLineString: number
  MultiPolygon: number
  GeometryCollection: number
  Other: number
}

export interface ElementDetail {
  type: string
  name: string | null
  length: number | null
}

export interface KmlData {
  geoJson: GeoJsonObject
  summary: ElementCounts
  details: ElementDetail[]
}

