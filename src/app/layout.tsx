import "~/styles/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "~/lib/utils"
import { auth } from "~/auth"
import Sign_In_Apple_Button from "~/components/auth/server/SignInAppleButton"
import Title from "~/components/home/Title"
import First_Sign_In_Form from "~/components/auth/FirstSignInForm"
import { SessionProvider } from "next-auth/react";
import Theme_Provider from "~/components/theme/theme_provider"
import Hero from "~/components/home/Hero"
import Nav_Bar from "~/components/home/NavBar"
import Avatar_Popover from "~/components/auth/AvatarPopover"
import Theme_Toggle from "~/components/theme/theme_toggle"
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user) {
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
            <main className="min-h-screen">
              <div className="w-full justify-end items-end p-3 flex flex-col">
                <Theme_Toggle />
              </div>
              <div className="w-full flex flex-col justify-center items-center">
                <Title />
                <Sign_In_Apple_Button />
              </div>
            </main>
            {children}
            </SessionProvider>
          </Theme_Provider>
        </body>
      </html>
    );
  } else {
    const users_email = session.user.email ?? "";
    const users_name = session.user.name ?? "New User";
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
              <div className="w-11/12 flex flex-col mx-auto">
                < First_Sign_In_Form users_name={users_name} users_email={users_email} />
              </div>
              <div className="flex flex-row p-4">
                <div className="w-1/6 md:w-1/4 p-4">
                  <div className="flex flex-col">
                    <Hero />
                    <Nav_Bar />
                  </div>
                </div>
                {children}
                <div className="w-1/12 p-4 flex flex-row justify-end">
                  <div className="pb-1 px-4">
                    <Theme_Toggle />
                  </div>
                  <div className="w-auto">
                    <Avatar_Popover />
                  </div>
                </div>
              </div>
            </SessionProvider>
          </Theme_Provider>
        </body>
      </html>
    );
  }
}
