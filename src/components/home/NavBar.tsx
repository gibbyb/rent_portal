import { Outfit as FontSans } from "next/font/google";
import { cn } from "~/lib/utils"
import Link from "next/link"
import {
  Card,
  CardContent,
} from "~/components/ui/card"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Nav_Bar() {
  return (
    <div className={cn("flex flex-col justify-start items-start " + 
      "py-6 text-lg md:text-xl lg:text-2xl font-semibold font-sans antialiased", fontSans.variable)}
    >
      <Card className="md:p-4">
        <CardContent className="py-4">
          <Link href="/">
            Dashboard
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Make Payment
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Auto-Payment
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Payment Methods
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Payment History
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Workorders
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Messages
          </Link>
        </CardContent>
        <CardContent className="py-4">
          <Link href="/">
            Documents
          </Link>
        </CardContent>
        <CardContent className="pt-4">
          <Link href="/billtracker">
            Bill Tracker
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
