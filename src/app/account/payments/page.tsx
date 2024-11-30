import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { CreditCard, DollarSign } from 'lucide-react'

// This would typically come from your database
const paymentHistory = [
  { id: 1, date: '2023-06-01', amount: 1200, status: 'Paid' },
  { id: 2, date: '2023-05-01', amount: 1200, status: 'Paid' },
  { id: 3, date: '2023-04-01', amount: 1200, status: 'Paid' },
]

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">$1,200.00</div>
          <p className="text-muted-foreground mt-2">Due on July 1, 2023</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <DollarSign className="mr-2 h-4 w-4" /> Make a Payment
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline">Edit</Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">Add Payment Method</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
