import Apple from "next-auth/providers/apple"

import type { NextAuthConfig } from "next-auth"

export default {
  providers: [Apple],
} satisfies NextAuthConfig
