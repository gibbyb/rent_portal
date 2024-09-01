"use server"
import { auth } from "~/auth"
import BreadCrumbBillTracker from "~/components/home/breadcrumb/BreadCrumbBillTracker"
import BillTrackerCalendar from "~/components/billtracker/BillTrackerCalendar"

export default async function HomePage() {
  const session = await auth()
  if (!session?.user) return <></>
    return (
      <div className="w-2/3 flex flex-col p-6">
        <div className="flex flex-row">
          <div className="">
            <BreadCrumbBillTracker />
          </div>
        </div>
        < BillTrackerCalendar />
      </div>
    );
}
