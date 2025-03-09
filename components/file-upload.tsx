"use client"

import type React from "react"

import { useState } from "react"
import { parseKmlFile } from "@/utils/kml-parser"
import type { KmlData } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, FileUp } from "lucide-react"

interface FileUploadProps {
  onFileProcessed: (data: KmlData) => void
}

export default function FileUpload({ onFileProcessed }: FileUploadProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".kml")) {
      setError("Please upload a KML file")
      setFileName(null)
      return
    }

    setFileName(file.name)
    setError(null)
    setIsLoading(true)

    try {
      const kmlData = await parseKmlFile(file)
      onFileProcessed(kmlData)
    } catch (err) {
      setError("Failed to parse KML file. Please check the file format.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="kml-file-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">KML files only</p>
              </div>
              <input
                id="kml-file-upload"
                type="file"
                accept=".kml"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          </div>

          {fileName && (
            <div className="flex items-center space-x-2">
              <FileUp className="w-4 h-4" />
              <span className="text-sm">{fileName}</span>
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          {isLoading && <p className="text-sm">Processing file...</p>}
        </div>
      </CardContent>
    </Card>
  )
}

