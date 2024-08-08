import { signIn } from "next-auth/react"
import { Button } from "~/components/ui/button"
import Image from "next/image"
 
export default function Sign_In() {
  return (
  <div className="flex flex-row bg-primary py-3 px-10 rounded-xl text-lg font-semibold
    mt-10 text-background my-auto">
    <Image src="/logos/Apple_logo_black.svg" alt="Apple logo" width={20} height={20}
    className="mr-4 my-auto"
    />
  <Button onClick={() => signIn("apple")}>Sign in with Apple</Button>
  </div>
  );
}
