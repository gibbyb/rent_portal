import Apple from "next-auth/providers/apple";
import type { NextAuthConfig } from "next-auth";

// Define the AppleProfile type inside or outside this file
interface AppleProfile {
  sub: string;    // Unique identifier for the user
  email?: string; // Email is marked as optional
  // Add other properties if needed
}

const authConfig: NextAuthConfig = {
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  providers: [
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: "" + process.env.AUTH_APPLE_SECRET,  // Convert to string
      checks: ["pkce"],
      token: {
        url: `https://appleid.apple.com/auth/token`,
      },
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      authorization: {
        params: {
          response_mode: "form_post",
          response_type: "code", // Ensure this is set correctly
          scope: "name email",
        },
      },
      profile(profile: AppleProfile) {
        return {
          id: profile.sub,             // Access sub safely
          name: "New User",            // Apple's profile doesn't return name
          email: profile.email,        // Access email safely, handle if optional
          image: "",                   // Default empty or handle according to need
        };
      },
    }),
  ],
};

export default authConfig;
