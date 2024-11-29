import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils"
import { auth } from "~/auth"
import { SessionProvider } from "next-auth/react";
import Theme_Provider from "~/components/theme/theme_provider"
import { type Metadata } from "next";
import Theme_Toggle from '~/components/theme/theme_toggle'
import { Button } from "~/components/ui/button"
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Tenant Portal",
  description: "Portal for tenants to pay rent",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
  }
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

          <div className="flex flex-col min-h-screen">
            <header className="bg-background shadow-sm">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl:md font-bold text-primary">Magnolia Coast Properties</Link>
                <nav className="hidden md:flex space-x-2 lg:space-x-4 text-sm lg:text-lg">
                  <Link href="#" className="text-gray-600 hover:text-primary">Home</Link>
                  <Link href="#" className="text-gray-600 hover:text-primary">Properties</Link>
                  <Link href="#" className="text-gray-600 hover:text-primary">Services</Link>
                  <Link href="#" className="text-gray-600 hover:text-primary">About</Link>
                  <Link href="#" className="text-gray-600 hover:text-primary">Contact</Link>
                </nav>
                <div className="flex space-x-2">
                  <Theme_Toggle/>
                  <Button variant="outline">Login</Button>
                  <Button>Register</Button>
                </div>
              </div>
            </header>
            {children}
            <footer className="bg-background text-primary py-8">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Magnolia Coast Property Management</h3>
                    <p>Your trusted partner in property management</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                      <li><Link href="#" className="hover:text-primary-foreground">Home</Link></li>
                      <li><Link href="#" className="hover:text-primary-foreground">Properties</Link></li>
                      <li><Link href="#" className="hover:text-primary-foreground">Services</Link></li>
                      <li><Link href="#" className="hover:text-primary-foreground">About Us</Link></li>
                      <li><Link href="#" className="hover:text-primary-foreground">Contact</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                    <p>123 Property Street</p>
                    <p>City, State 12345</p>
                    <p>Phone: (123) 456-7890</p>
                    <p>Email: info@propertypro.com</p>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <p>&copy; 2024 Magnolia Coast Property Management LLC. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
          </SessionProvider>
        </Theme_Provider>
      </body>
    </html>
  );
}
