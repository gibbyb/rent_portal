import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { CreditCard, FileText, MessageSquare, PenToolIcon as Tool, BarChart, Users, Home } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-64 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-2">
              <Link href="/admin" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <Link href="/admin/tenants" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" /> Tenants
                </Button>
              </Link>
              <Link href="/admin/properties" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" /> Properties
                </Button>
              </Link>
              <Link href="/admin/payments" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" /> Payments
                </Button>
              </Link>
              <Link href="/admin/workorders" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Tool className="mr-2 h-4 w-4" /> Work Orders
                </Button>
              </Link>
              <Link href="/admin/messages" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" /> Messages
                </Button>
              </Link>
              <Link href="/admin/documents" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" /> Documents
                </Button>
              </Link>
            </nav>
          </CardContent>
        </Card>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
