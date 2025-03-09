import "@testing-library/jest-dom"

// Mock the leaflet library
jest.mock("leaflet", () => ({
  map: jest.fn(),
  tileLayer: jest.fn(),
  geoJSON: jest.fn(() => ({
    getBounds: jest.fn(() => ({
      isValid: jest.fn(() => true),
    })),
  })),
}))

// Mock the react-leaflet components
jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  GeoJSON: () => <div data-testid="geo-json" />,
  useMap: () => ({
    fitBounds: jest.fn(),
  }),
}))

// Mock the togeojson library
jest.mock("@mapbox/togeojson", () => ({
  kml: jest.fn(() => ({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [78.9629, 20.5937, 0],
        },
        properties: {
          name: "Sample Point",
        },
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [78.9629, 20.5937, 0],
            [78.9829, 20.6037, 0],
          ],
        },
        properties: {
          name: "Sample Line",
        },
      },
    ],
  })),
}))

// Mock the turf library
jest.mock("@turf/turf", () => ({
  length: jest.fn(() => 1.23),
}))

// Mock the window.URL.createObjectURL
if (typeof window !== "undefined") {
  window.URL.createObjectURL = jest.fn(() => "mock-url")
}

