"use client"

import { useState } from "react"
import FileUpload from "@/components/file-upload"
import MapView from "@/components/map-view"
import SummaryView from "@/components/summary-view"
import DetailView from "@/components/detail-view"
import type { KmlData } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const [kmlData, setKmlData] = useState<KmlData | null>(null)
  const [activeTab, setActiveTab] = useState<string>("map")

  const handleFileProcessed = (data: KmlData) => {
    setKmlData(data)
    setActiveTab("map")
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">KML File Viewer and Analyzer</h1>

        <FileUpload onFileProcessed={handleFileProcessed} />

        {kmlData && (
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="map">Map View</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="detail">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="map" className="border rounded-md p-4">
                <MapView geoJsonData={kmlData.geoJson} />
              </TabsContent>

              <TabsContent value="summary" className="border rounded-md p-4">
                <SummaryView elementCounts={kmlData.summary} />
              </TabsContent>

              <TabsContent value="detail" className="border rounded-md p-4">
                <DetailView elements={kmlData.details} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </main>
  )
}

