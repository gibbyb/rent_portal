import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils"
import { SessionProvider } from "next-auth/react";
import Theme_Provider from "~/components/theme/theme_provider"
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Tenant Portal",
  description: "Portal for tenants to pay rent",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable)}
      >
        <Theme_Provider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <SessionProvider>
          {children}
          </SessionProvider>
        </Theme_Provider>
      </body>
    </html>
  );
}
