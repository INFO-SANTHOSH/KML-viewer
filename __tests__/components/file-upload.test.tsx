import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import FileUpload from "@/components/file-upload"
import { parseKmlFile } from "@/utils/kml-parser"

// Mock the kml-parser module
jest.mock("@/utils/kml-parser")

describe("FileUpload Component", () => {
  const mockOnFileProcessed = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the file upload area", () => {
    render(<FileUpload onFileProcessed={mockOnFileProcessed} />)

    expect(screen.getByText(/Click to upload/i)).toBeInTheDocument()
    expect(screen.getByText(/KML files only/i)).toBeInTheDocument()
  })

  it("shows an error when a non-KML file is selected", async () => {
    render(<FileUpload onFileProcessed={mockOnFileProcessed} />)

    const file = new File(["content"], "test.txt", { type: "text/plain" })
    const input = screen.getByLabelText(/Click to upload/i, { selector: "input" })

    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/Please upload a KML file/i)).toBeInTheDocument()
    expect(parseKmlFile).not.toHaveBeenCalled()
    expect(mockOnFileProcessed).not.toHaveBeenCalled()
  })

  it("processes a valid KML file", async () => {
    // Mock the parseKmlFile function to return a successful result
    const mockKmlData = { geoJson: {}, summary: {}, details: [] }
    ;(parseKmlFile as jest.Mock).mockResolvedValue(mockKmlData)

    render(<FileUpload onFileProcessed={mockOnFileProcessed} />)

    const file = new File(["content"], "test.kml", { type: "application/vnd.google-earth.kml+xml" })
    const input = screen.getByLabelText(/Click to upload/i, { selector: "input" })

    fireEvent.change(input, { target: { files: [file] } })

    await waitFor(() => {
      expect(parseKmlFile).toHaveBeenCalledWith(file)
      expect(mockOnFileProcessed).toHaveBeenCalledWith(mockKmlData)
    })
  })

  it("shows an error when file parsing fails", async () => {
    // Mock the parseKmlFile function to throw an error
    ;(parseKmlFile as jest.Mock).mockRejectedValue(new Error("Parsing error"))

    render(<FileUpload onFileProcessed={mockOnFileProcessed} />)

    const file = new File(["content"], "test.kml", { type: "application/vnd.google-earth.kml+xml" })
    const input = screen.getByLabelText(/Click to upload/i, { selector: "input" })

    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText(/Failed to parse KML file/i)).toBeInTheDocument()
    expect(mockOnFileProcessed).not.toHaveBeenCalled()
  })
})

