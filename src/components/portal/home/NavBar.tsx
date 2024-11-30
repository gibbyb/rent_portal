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
    <div className={cn("flex flex-col justify-start items-start h-5/6 my-auto" + 
      "py-6 text-lg md:text-xl lg:text-2xl font-semibold font-sans antialiased", fontSans.variable)}
    >
      <Card className="md:p-4">
        <CardContent className="py-4">
          <Link href="/">
            Payments
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
          <Link href="/account/billtracker">
            Bill Tracker
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
