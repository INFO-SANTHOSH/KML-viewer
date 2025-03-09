import { render, screen } from "@testing-library/react"
import MapView from "@/components/map-view"
import type { GeoJsonObject } from "geojson"

// Mock useEffect
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn((f) => f()),
  useState: jest.fn((init) => [true, jest.fn()]),
}))

describe("MapView Component", () => {
  it("renders the map container with GeoJSON data", () => {
    const geoJsonData: GeoJsonObject = {
      type: "FeatureCollection",
      features: [],
    }

    render(<MapView geoJsonData={geoJsonData} />)

    // Check for the map container
    expect(screen.getByTestId("map-container")).toBeInTheDocument()

    // Check for the tile layer
    expect(screen.getByTestId("tile-layer")).toBeInTheDocument()

    // Check for the GeoJSON layer
    expect(screen.getByTestId("geo-json")).toBeInTheDocument()
  })
})

