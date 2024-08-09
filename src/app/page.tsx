"use server"
import Theme_Toggle from "~/components/theme/theme_toggle"
import { auth } from "~/auth"
import Sign_In_Apple_Button from "~/components/auth/server/SignInAppleButton"
import Title from "~/components/home/Title"
import Avatar_Popover from "~/components/auth/AvatarPopover"
import First_Sign_In_Form from "~/components/auth/FirstSignInForm"
import Hero from "~/components/home/Hero"

export default async function HomePage() {
  const session = await auth();
  if (!session?.user) {
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
    const users_email = session.user.email ?? "";
    const users_name = session.user.name ?? "New User";
    return (
      <main className="min-h-screen">
        < First_Sign_In_Form users_name={users_name} users_email={users_email} />
        <div className="w-11/12 flex flex-row p-4 mx-auto">
          < Hero />
          <div className="w-full p-3 flex flex-row justify-end items-end">
            <div className="my-auto flex flex-row justify-end items-end">
              <div className="pb-1 px-4">
                <Theme_Toggle />
              </div>
              <div className="pl-2">
                <Avatar_Popover />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
