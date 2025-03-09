import { render, screen } from "@testing-library/react"
import SummaryView from "@/components/summary-view"
import type { ElementCounts } from "@/types"

describe("SummaryView Component", () => {
  it("renders the summary table with element counts", () => {
    const elementCounts: ElementCounts = {
      Point: 2,
      LineString: 1,
      Polygon: 3,
      MultiPoint: 0,
      MultiLineString: 1,
      MultiPolygon: 0,
      GeometryCollection: 0,
      Other: 0,
    }

    render(<SummaryView elementCounts={elementCounts} />)

    // Check for the title
    expect(screen.getByText("KML Elements Summary")).toBeInTheDocument()

    // Check for table headers
    expect(screen.getByText("Element Type")).toBeInTheDocument()
    expect(screen.getByText("Count")).toBeInTheDocument()

    // Check for element types and counts
    expect(screen.getByText("Point")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()

    expect(screen.getByText("LineString")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()

    expect(screen.getByText("Polygon")).toBeInTheDocument()
    expect(screen.getByText("3")).toBeInTheDocument()

    expect(screen.getByText("MultiLineString")).toBeInTheDocument()

    // Elements with count 0 should not be displayed
    expect(screen.queryByText("MultiPoint")).not.toBeInTheDocument()
    expect(screen.queryByText("MultiPolygon")).not.toBeInTheDocument()
    expect(screen.queryByText("GeometryCollection")).not.toBeInTheDocument()
    expect(screen.queryByText("Other")).not.toBeInTheDocument()
  })

  it("displays a message when no elements are found", () => {
    const elementCounts: ElementCounts = {
      Point: 0,
      LineString: 0,
      Polygon: 0,
      MultiPoint: 0,
      MultiLineString: 0,
      MultiPolygon: 0,
      GeometryCollection: 0,
      Other: 0,
    }

    render(<SummaryView elementCounts={elementCounts} />)

    expect(screen.getByText("No elements found")).toBeInTheDocument()
  })
})

