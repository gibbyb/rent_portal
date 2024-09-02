"use client"
import * as React from "react"
import { Calendar } from "~/components/ui/BillTrackerCalendar"
import { Button } from "~/components/ui/button"

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
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="m-auto p-2 relative" ref={calendarRef}>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleSelect}
        className="rounded-md border m-auto"
      />
      {isOpen && selectedDate && (
        <div 
          ref={popoverRef}
          className="absolute top-full left-1/2 transform -translate-x-1/2 border rounded-lg shadow-lg px-4 pb-4 w-80"
        >
          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex flex-row w-full">
                <h3 className="font-medium leading-none text-center mx-auto mt-2 py-2 md:text-xl">
                  {selectedDate.toDateString()}
                </h3>
                <button className="justify-self-end ml-auto bg-none text-primary text-m md:text-xl"
                  onClick={() => setIsOpen(false)}
                >
                  x
                </button>
              </div>
              <p>Add your events or bills due here.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
