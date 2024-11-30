'use client'

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { CreditCard, Users, Home, Wrench, AlertTriangle } from 'lucide-react'

// Mock data for charts
const rentData = [
  { month: "Jan", collected: 95 },
  { month: "Feb", collected: 98 },
  { month: "Mar", collected: 92 },
  { month: "Apr", collected: 97 },
  { month: "May", collected: 99 },
  { month: "Jun", collected: 94 },
]

const occupancyData = [
  { month: "Jan", rate: 92 },
  { month: "Feb", rate: 94 },
  { month: "Mar", rate: 96 },
  { month: "Apr", rate: 95 },
  { month: "May", rate: 97 },
  { month: "Jun", rate: 98 },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,560</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+3 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">-5 from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rent Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              collected: {
                label: "Collected",
                color: "hsl(var(--chart-1))",
              },
            }} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rentData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="collected" fill="var(--color-collected)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              rate: {
                label: "Occupancy Rate",
                color: "hsl(var(--chart-2))",
              },
            }} className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={occupancyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm">New work order: Leaky faucet at 123 Main St, Apt 4B</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-sm">New tenant: John Doe moved into 456 Elm St, Apt 2A</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-sm">Rent payment received: $1,200 from Jane Smith, 789 Oak Rd, Apt 3C</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lease Renewals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">123 Main St, Apt 2B</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Expires in 30 days</p>
                <Button size="sm">Send Renewal</Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Michael Brown</p>
                <p className="text-sm text-muted-foreground">456 Elm St, Apt 1A</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Expires in 45 days</p>
                <Button size="sm">Send Renewal</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
