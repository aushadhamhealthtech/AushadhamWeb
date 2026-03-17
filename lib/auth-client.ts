"use client";
import { createAuthClient } from "better-auth/react";

function getBaseURL() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.NEXT_PUBLIC_VERCEL_URL)
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { useSession, signIn, signUp, signOut, requestPasswordReset, resetPassword } = authClient;
