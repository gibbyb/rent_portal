import { signOut } from "next-auth/react"
import { Button } from "~/components/ui/button"
 
export default function Sign_Out() {
  return <Button onClick={() => signOut()}>Sign Out</Button>
}
