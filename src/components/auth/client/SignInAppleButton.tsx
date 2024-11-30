import { signIn } from "next-auth/react"
import { Button } from "~/components/ui/button"
import Image from "next/image"
 
export default function Sign_In() {
  return (
    <Button onClick={() => signIn("apple")} className="flex flex-row bg-primary py-3
      px-10 rounded-md text-md font-semibold text-background">
      <Image src="/logos/Apple_logo_black.svg" alt="Apple logo" width={16} height={16}
      className="mr-4"
      />
      Sign in with Apple
    </Button>
  );
}
