"use server"
import Theme_Toggle from "~/components/theme/theme_toggle"
import { auth } from "~/auth"
import Sign_In_Apple_Button from "~/components/auth/server/SignInAppleButton"
import Title from "~/components/home/Title"

export default async function HomePage() {
  const session = await auth();
  if (!session) {
    return (
      <main className="min-h-screen">
        <div className="w-full justify-end items-end p-3 flex flex-col">
          <Theme_Toggle />
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <Title />
          <Sign_In_Apple_Button />
        </div>
      </main>
    );
  } else {
    const email = session?.user?.email;
    return (
      <main className="min-h-screen">
        <div className="w-full justify-end items-end p-3 flex flex-col">
          <Theme_Toggle />
          <div className="w-full flex flex-col justify-center items-center">
            <h1>Welcome, {email}</h1>
          </div>
        </div>
      </main>
    );
  }
}
