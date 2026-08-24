import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "./database"

import * as schema from "./db/schema"
import { sendEmailAsync } from "./services/ResendService"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendEmailAsync(
        user.email,
        "Reset your Randomio password",
        `Click the link to reset your password: ${url}`,
      )
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`)
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [process.env.CLIENT_URL!],
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      void sendEmailAsync(
        user.email,
        "Verify your email",
        `Click the link to verify your email: ${url}`,
      )
    },
  },
})
