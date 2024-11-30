import { Button } from "~/components/ui/button"
import { signOut } from "~/auth"
 
export default function Sign_Out() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit" className="w-full"
      >
        Sign Out
      </Button>
    </form>
  )
}
