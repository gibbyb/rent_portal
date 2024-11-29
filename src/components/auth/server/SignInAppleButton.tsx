import { signIn } from "~/auth"
 
export default function Sign_In_Apple() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("apple")
      }}
    >
      <div className="flex flex-row bg-primary py-3 px-10 rounded-xl text-lg font-semibold
            mt-10 text-background my-auto">
        <div
          className="apple-logo my-auto"
          style={{ backgroundImage: 'var(--apple-logo)' }}
        />
        <button type="submit">Sign in with Apple</button>
      </div>
    </form>
  )
}
