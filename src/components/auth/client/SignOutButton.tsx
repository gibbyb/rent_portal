import { signOut } from "next-auth/react"
import { Button } from "~/components/ui/button"
 
export default function Sign_Out() {
  return (
    <Button
      onClick={() => signOut()}
      className="flex flex-row bg-yellow py-3
        px-10 rounded-md text-md font-semibold text-background"
    >
      Sign out
    </Button>
  );
}
