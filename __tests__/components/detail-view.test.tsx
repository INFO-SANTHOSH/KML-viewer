import { render, screen } from "@testing-library/react"
import DetailView from "@/components/detail-view"
import type { ElementDetail } from "@/types"

describe("DetailView Component", () => {
  it("renders the detail table with element information", () => {
    const elements: ElementDetail[] = [
      { type: "Point", name: "Sample Point", length: null },
      { type: "LineString", name: "Sample Line", length: 1.23 },
      { type: "Polygon", name: null, length: null },
    ]

    render(<DetailView elements={elements} />)

    // Check for the title
    expect(screen.getByText("KML Elements Details")).toBeInTheDocument()

    // Check for table headers
    expect(screen.getByText("Element Type")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Length (km)")).toBeInTheDocument()

    // Check for element details
    expect(screen.getByText("Point")).toBeInTheDocument()
    expect(screen.getByText("Sample Point")).toBeInTheDocument()

    expect(screen.getByText("LineString")).toBeInTheDocument()
    expect(screen.getByText("Sample Line")).toBeInTheDocument()
    expect(screen.getByText("1.23")).toBeInTheDocument()

    expect(screen.getByText("Polygon")).toBeInTheDocument()
    expect(screen.getByText("Unnamed")).toBeInTheDocument()
    expect(screen.getAllByText("N/A").length).toBeGreaterThan(0)
  })

  it("displays a message when no elements are found", () => {
    render(<DetailView elements={[]} />)

    expect(screen.getByText("No elements found")).toBeInTheDocument()
  })
})

