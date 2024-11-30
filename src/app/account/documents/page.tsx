import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { FileText, Download, Upload } from 'lucide-react'

// Mock data for documents
const documents = [
  { id: 1, name: 'Lease Agreement', type: 'PDF', size: '2.5 MB', date: '2023-01-15' },
  { id: 2, name: 'Move-in Checklist', type: 'DOCX', size: '1.2 MB', date: '2023-01-15' },
  { id: 3, name: 'Rent Payment Receipt - June 2023', type: 'PDF', size: '0.5 MB', date: '2023-06-01' },
  { id: 4, name: 'Property Rules and Regulations', type: 'PDF', size: '1.8 MB', date: '2023-01-15' },
]

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Documents</CardTitle>
            <Button>
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      {doc.name}
                    </div>
                  </TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>{doc.date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

