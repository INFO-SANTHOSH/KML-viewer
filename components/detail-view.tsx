import type { ElementDetail } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DetailViewProps {
  elements: ElementDetail[]
}

export default function DetailView({ elements }: DetailViewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>KML Elements Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Element Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Length (km)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.length > 0 ? (
              elements.map((element, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{element.type}</TableCell>
                  <TableCell>{element.name || "Unnamed"}</TableCell>
                  <TableCell className="text-right">{element.length ? element.length.toFixed(2) : "N/A"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No elements found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

