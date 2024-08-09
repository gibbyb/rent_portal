"use server"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"
import { auth } from "~/auth"
import Sign_Out_Button from "~/components/auth/server/SignOutButton"

export default async function Avatar_Popover() {
  const session = await auth();
  const pfp = session?.user?.image ?? "";
  const users_name = session?.user?.name ?? "New User";
  const initials = users_name.split(" ").map((name) => name[0]).join("");
  console.log(pfp);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={pfp} alt="@shadcn"/>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{users_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div className="w-full flex flex-row
            justify-center items-center">
            Settings
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem> 
          <Sign_Out_Button />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
