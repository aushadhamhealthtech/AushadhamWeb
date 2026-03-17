import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { Resend } from "resend";
import { db } from "./db";
import * as schema from "./schema";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function getServerURL() {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    sendResetPassword: async ({ user, url }) => {
      if (!resend) throw new Error("RESEND_API_KEY is not configured");
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Aushadham <noreply@aushadham.com>",
        to: user.email,
        subject: "Reset your Aushadham password",
        html: `
          <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
            <h2 style="color:#065b4b;font-size:22px;">Reset your password</h2>
            <p style="color:#444;font-size:14px;line-height:1.6;">
              Hi ${escapeHtml(user.name || "there")},<br/><br/>
              We received a request to reset your Aushadham account password. Click the button below to set a new one.
            </p>
            <a href="${url}" style="display:inline-block;margin:24px 0;padding:14px 32px;background:#228573;color:white;text-decoration:none;border-radius:999px;font-weight:600;font-size:14px;">
              Reset Password
            </a>
            <p style="color:#888;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
    },
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
  trustedOrigins: [
    "http://localhost:3000",
    process.env.BETTER_AUTH_URL || "",
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "",
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "",
  ].filter(Boolean),
  plugins: [nextCookies(), openAPI()],
  baseURL: getServerURL(),
  secret: process.env.BETTER_AUTH_SECRET,
});
