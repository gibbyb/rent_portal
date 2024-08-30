"use server"
import { auth } from "~/auth"
import Breadcrumb_Home from "~/components/home/breadcrumb/BreadcrumbHome"

export default async function HomePage() {
  const session = await auth()
  if (!session?.user) return <></>
    return (
      <div className="w-2/3 flex flex-col p-6">
        <div className="flex flex-row">
          <div className="">
            <Breadcrumb_Home />
          </div>
        </div>
      </div>
    );
}
