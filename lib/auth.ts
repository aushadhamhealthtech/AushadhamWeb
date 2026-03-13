import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  user: {
    additionalFields: {
      phone: { type: "string", required: false },
      role: { type: "string", required: false, defaultValue: "patient" },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Refresh daily
  },
  plugins: [nextCookies()],
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});
