import { Outfit as FontSans } from "next/font/google";
import { cn } from "~/lib/utils"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Nav_Bar() {
  return (
    <div className={cn("flex flex-col justify-start items-start " + 
      "py-6 text-2xl font-semibold font-sans antialiased", fontSans.variable)}
    >
      <Card className="p-4">
        <CardHeader>
        </CardHeader>
        <CardContent className="pb-12">
          <Link href="/">
            Dashboard
          </Link>
        </CardContent>
        <CardContent className="pb-12">
          <Link href="/">
            Make Payment
          </Link>
        </CardContent>
        <CardContent className="pb-12">
          <Link href="/">
            Auto-Payment
          </Link>
        </CardContent>
        <CardContent className="pb-12">
          <Link href="/">
            Payment Methods
          </Link>
        </CardContent>
        <CardContent className="pb-12">
          <Link href="/">
            Payment History
          </Link>
        </CardContent>
        <CardContent className="pb-12">
          <Link href="/">
            Workorders
          </Link>
        </CardContent>
        <CardContent className="pb-12">
          <Link href="/">
            Messages
          </Link>
        </CardContent>
        <CardContent>
          <Link href="/">
            Documents
          </Link>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
};
