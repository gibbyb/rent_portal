"use server"
import Theme_Toggle from "~/components/theme/theme_toggle"
import { auth } from "~/auth"
import Sign_In_Apple_Button from "~/components/auth/server/SignInAppleButton"
import Title from "~/components/home/Title"
import Avatar_Popover from "~/components/auth/AvatarPopover"
import First_Sign_In_Form from "~/components/auth/FirstSignInForm"

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
    console.log("session:", session);
    console.log("users_email:", users_email);
    console.log("users_name:", users_name);
    return (
      <main className="min-h-screen">
        <div className="w-full justify-end items-end p-3 flex flex-col">
          <div className="my-auto flex flex-row">
            <div className="px-4">
              <Avatar_Popover />
            </div>
            <Theme_Toggle />
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <h1>Welcome, {users_name.split(" ")[0]}</h1>
            <First_Sign_In_Form users_name={users_name} users_email={users_email} />
          </div>
        </div>
      </main>
    );
  }
}
