import NextAuth from "next-auth"
import Apple from "next-auth/providers/apple"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Apple],
})
//import NextAuth from "next-auth"
//import { DrizzleAdapter } from "@auth/drizzle-adapter"
//import { db } from "~/server/db/schema"
//import authConfig from "~/auth.config"
 
//export const { handlers, signIn, signOut, auth } = NextAuth({
  //adapter: DrizzleAdapter(db),
  //session: { strategy: "jwt" },
  //...authConfig
//})
