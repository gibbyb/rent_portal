import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "~/components/ui/breadcrumb"
import Link from "next/link"

export default function Breadcrumb_Home() {
  return (
    <Breadcrumb className="w-full m-auto flex flex-row justify-center items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <Link href="/">
            <h1 className="text-3xl font-bold text-center font-sans antialiased">
              Dashboard
            </h1>
          </Link>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
