"use client"
import * as React from "react"
import { Calendar } from "~/components/ui/BillTrackerCalendar"
import CreateBillForm from "~/components/billtracker/CreateBillForm"

export default function BillTrackerCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined)
  const [isOpen, setIsOpen] = React.useState(false)
  const calendarRef = React.useRef<HTMLDivElement>(null)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      if (selectedDate && date.getTime() === selectedDate.getTime())
        setIsOpen(!isOpen)
      else {
        setSelectedDate(date)
        setIsOpen(true)
      }
    } else
      setIsOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        popoverRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        //setIsOpen(false)
        console.log('Calendar closed');
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="m-auto p-2 relative mt-10" ref={calendarRef}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        className="rounded-md border m-auto"
      />
      {isOpen && selectedDate && (
        <div 
          ref={popoverRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2
            border rounded-lg shadow-lg px-4 pb-4 w-80"
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              < CreateBillForm date={selectedDate} setIsOpen={setIsOpen} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
