import Link from 'next/link'
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { CreditCard, FileText, MessageSquare, PenToolIcon as Tool, BarChart } from 'lucide-react'

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">My Account</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-64 h-fit">
          <CardContent className="p-4">
            <nav className="space-y-2">
              <Link href="/account" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" /> Dashboard
                </Button>
              </Link>
              <Link href="/account/payments" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" /> Payments
                </Button>
              </Link>
              <Link href="/account/workorders" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <Tool className="mr-2 h-4 w-4" /> Work Orders
                </Button>
              </Link>
              <Link href="/account/messages" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" /> Messages
                </Button>
              </Link>
              <Link href="/account/documents" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" /> Documents
                </Button>
              </Link>
              <Link href="/account/billtracker" passHref>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" /> Bill Tracker
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


