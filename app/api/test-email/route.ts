import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "ssvmatta@gmail.com",
    subject: `Your Aushadham OTP: ${otp}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;text-align:center;">
        <h2 style="color:#065b4b;font-size:22px;">Your Verification Code</h2>
        <p style="color:#444;font-size:14px;">Use the code below to verify your identity:</p>
        <div style="margin:24px 0;padding:18px 32px;background:#e8f5f2;border-radius:12px;display:inline-block;">
          <span style="font-size:36px;font-weight:800;letter-spacing:8px;color:#228573;">${otp}</span>
        </div>
        <p style="color:#888;font-size:12px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  return NextResponse.json({ success: true, data });
}
