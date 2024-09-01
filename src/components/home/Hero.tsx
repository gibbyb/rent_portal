import { Outfit as FontSans } from "next/font/google";
import { cn } from "~/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function Hero() {
  return (
    <div className="flex flex-col justify-start items-start">
    <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold text-center font-sans antialiased", 
      fontSans.variable)}
    >
      TENANT
    </h1>
    <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold text-center font-sans antialiased", 
      fontSans.variable)}
    >
      PORTAL
    </h1>
    </div>
  );
};
