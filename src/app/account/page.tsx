import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { Progress } from "~/components/ui/progress"
import { CreditCard, AlertTriangle, CheckCircle } from 'lucide-react'

export default function AccountHomePage() {
  // This data would typically come from your backend
  const accountData = {
    balance: 1200,
    nextPaymentDue: "2023-07-01",
    recentPayment: {
      amount: 1200,
      date: "2023-06-01"
    },
    workOrders: [
      { id: 1, title: "Leaky faucet", status: "In Progress" },
      { id: 2, title: "Broken AC", status: "Scheduled" }
    ],
    documents: [
      { id: 1, title: "Lease Agreement", date: "2023-01-15" },
      { id: 2, title: "Move-in Checklist", date: "2023-01-15" }
    ]
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${accountData.balance}</div>
                <p className="text-xs text-muted-foreground">
                  Next payment due: {accountData.nextPaymentDue}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Payment</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${accountData.recentPayment.amount}</div>
                <p className="text-xs text-muted-foreground">
                  Paid on: {accountData.recentPayment.date}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lease Progress</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Progress value={33} className="w-full" />
                <p className="text-xs text-muted-foreground mt-2">
                  4 months remaining
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {accountData.workOrders.map(order => (
                <li key={order.id} className="flex justify-between items-center">
                  <span>{order.title}</span>
                  <span className="text-sm text-muted-foreground">{order.status}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4">View All Work Orders</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {accountData.documents.map(doc => (
                <li key={doc.id} className="flex justify-between items-center">
                  <span>{doc.title}</span>
                  <span className="text-sm text-muted-foreground">{doc.date}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full mt-4">View All Documents</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


