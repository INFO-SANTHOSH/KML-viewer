import { parseKmlFile } from "@/utils/kml-parser"
import toGeoJSON from "@mapbox/togeojson"
import { describe, it, expect, jest } from "@jest/globals"

jest.mock("@mapbox/togeojson", () => ({
  kml: jest.fn(),
}))

// Mock the FileReader API
global.FileReader = class {
  onload: any
  onerror: any
  readAsText(file: Blob) {
    this.onload = (event: any) => {
      if (event && event.target && event.target.result) {
        this.onload({ target: { result: "<kml></kml>" } })
      } else {
        this.onerror(new Error("Failed to read file"))
      }
    }
    this.onerror = () => {}
    this.readAsText = () => {}
    this.onload({ target: { result: "<kml></kml>" } })
  }
}

// Mock DOMParser
global.DOMParser = class {
  parseFromString() {
    return document.implementation.createDocument("", "", null)
  }
}

describe("KML Parser", () => {
  it("should parse a KML file and return the expected data structure", async () => {
    // Create a mock file
    const file = new File(["<kml></kml>"], "test.kml", { type: "application/vnd.google-earth.kml+xml" })

    // Call the parser
    const result = await parseKmlFile(file)

    // Check the structure of the result
    expect(result).toHaveProperty("geoJson")
    expect(result).toHaveProperty("summary")
    expect(result).toHaveProperty("details")

    // Verify toGeoJSON was called
    expect(toGeoJSON.kml).toHaveBeenCalled()
  })

  it("should handle errors when parsing fails", async () => {
    // Override the FileReader mock to simulate an error
    global.FileReader = class {
      onload: any
      onerror: any
      readAsText(file: Blob) {
        this.onload = (event: any) => {
          if (event && event.target && event.target.result) {
            this.onload({ target: { result: "<kml></kml>" } })
          } else {
            this.onerror(new Error("Failed to read file"))
          }
        }
        this.onerror = () => {}
        this.readAsText = () => {}
        this.onerror(new Error("Failed to read file"))
      }
    }

    // Create a mock file
    const file = new File(["<kml></kml>"], "test.kml", { type: "application/vnd.google-earth.kml+xml" })

    // Expect the parser to reject with an error
    await expect(parseKmlFile(file)).rejects.toThrow("Failed to read file")
  })
})

