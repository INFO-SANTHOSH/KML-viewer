import type { ElementCounts } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface SummaryViewProps {
  elementCounts: ElementCounts
}

export default function SummaryView({ elementCounts }: SummaryViewProps) {
  const elements = Object.entries(elementCounts).filter(([_, count]) => count > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>KML Elements Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Element Type</TableHead>
              <TableHead className="text-right">Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {elements.length > 0 ? (
              elements.map(([type, count]) => (
                <TableRow key={type}>
                  <TableCell className="font-medium">{type}</TableCell>
                  <TableCell className="text-right">{count}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
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

