import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import Link from "next/link"

export default function Breadcrumb_Home() {
  return (
    <Breadcrumb className="w-full m-auto flex flex-row justify-center items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">
            <h1 className="text-xl pl-20 pt-4 lg:text-3xl lg:pl-0 lg:pt-0 font-bold text-center font-sans antialiased">
              Dashboard
            </h1>
          </Link>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="pt-4 lg:pt-0"/>
        <BreadcrumbItem>
          <Link href="/billtracker">
            <h1 className="text-xl pt-4 lg:text-3xl lg:pt-0 font-bold text-center font-sans antialiased">
              Bill Tracker
            </h1>
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
