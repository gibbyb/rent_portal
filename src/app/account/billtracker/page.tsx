'use client'

import { useState } from 'react'
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Calendar } from "~/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Plus, DollarSign } from 'lucide-react'

// Mock data for bills
const initialBills = [
  { id: 1, name: 'Electricity', amount: 80, dueDate: new Date(2023, 6, 15), category: 'Utilities' },
  { id: 2, name: 'Internet', amount: 60, dueDate: new Date(2023, 6, 20), category: 'Utilities' },
  { id: 3, name: 'Water', amount: 40, dueDate: new Date(2023, 6, 25), category: 'Utilities' },
]

export default function BillTrackerPage() {
  const [bills, setBills] = useState(initialBills)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddBill = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const newBill = {
      id: bills.length + 1,
      name: formData.get('billName') as string,
      amount: Number(formData.get('amount')),
      dueDate: selectedDate as Date,
      category: formData.get('category') as string,
    }
    setBills([...bills, newBill])
    setIsDialogOpen(false)
  }

  const getDayContent = (day: Date | undefined) => {
    if (!day) return null;
    const dayBills = bills.filter(bill => 
      bill.dueDate.getDate() === day.getDate() &&
      bill.dueDate.getMonth() === day.getMonth() &&
      bill.dueDate.getFullYear() === day.getFullYear()
    )
    return dayBills.length > 0 ? (
      <div className="w-full h-full flex items-center justify-center">
        <div className="h-2 w-2 bg-primary rounded-full" />
      </div>
    ) : null
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">Bill Tracker</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Bill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleAddBill}>
                  <DialogHeader>
                    <DialogTitle>Add New Bill</DialogTitle>
                    <DialogDescription>
                      Enter the details of the bill you want to track.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="billName" className="text-right">
                        Bill Name
                      </Label>
                      <Input id="billName" name="billName" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input id="amount" name="amount" type="number" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="category" className="text-right">
                        Category
                      </Label>
                      <Select name="category" required>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Utilities">Utilities</SelectItem>
                          <SelectItem value="Rent">Rent</SelectItem>
                          <SelectItem value="Insurance">Insurance</SelectItem>
                          <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Bill</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                components={{
                  DayContent: ({ date }) => getDayContent(date),
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Upcoming Bills</h3>
              <ul className="space-y-2">
                {bills.map((bill) => (
                  <li key={bill.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div>
                      <p className="font-medium">{bill.name}</p>
                      <p className="text-sm text-muted-foreground">{bill.dueDate.toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-primary" />
                      <span className="font-semibold">{bill.amount.toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

