"use client"
import * as React from "react"
import { Calendar } from "~/components/ui/BillTrackerCalendar"

export default function BillTrackerCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="m-auto p-2">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border m-auto"
      />
    </div>
  )
}
