"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import gsap from "gsap";
import { requestPasswordReset } from "@/lib/auth-client";
import { AuthInput } from "./AuthInput";
import type { View } from "./types";

export function ForgotPasswordView({ onSwitch }: { onSwitch: (v: View) => void }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
    const successRef = useRef<HTMLDivElement>(null);

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!email) return;
        setError("");
        setLoading(true);
        const { error: resetError } = await requestPasswordReset({ email, redirectTo: "/reset-password" });
        setLoading(false);
        if (resetError) {
            setError(resetError.message || "Failed to send reset link");
        } else {
            setSent(true);
        }
    }

    useEffect(() => {
        if (sent && successRef.current) {
            gsap.fromTo(successRef.current,
                { scale: 0.82, opacity: 0, y: 18 },
                { scale: 1, opacity: 1, y: 0, duration: 0.48, ease: "back.out(1.9)" }
            );
        }
    }, [sent]);

    return (
        <div>
            <button
                onClick={() => onSwitch("signin")}
                className="auth-field flex items-center gap-1.5 text-xs font-semibold mb-5 hover:underline text-brand-mid"
            >
                <ArrowLeft size={12} /> Back to sign in
            </button>

            {sent ? (
                <div ref={successRef} className="flex flex-col items-center text-center py-6 gap-5">
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                        style={{ background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-light) 100%)", boxShadow: "0 8px 32px color-mix(in srgb, var(--brand-mid) 32%, transparent)" }}
                    >
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <path d="M8 20L15 27L30 11" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-[22px] font-extrabold mb-2 text-brand-dark">
                            Check your inbox!
                        </h2>
                        <p className="text-sm leading-relaxed text-brand-dark/60">
                            We sent a reset link to<br />
                            <span className="font-bold text-brand-mid">{email}</span>
                        </p>
                    </div>
                    <p className="text-xs text-brand-dark/45">
                        Didn&apos;t get it?{" "}
                        <button
                            type="button"
                            onClick={() => { setSent(false); setEmail(""); }}
                            className="font-semibold hover:underline text-brand-mid"
                        >
                            Try again
                        </button>
                    </p>
                    <button
                        onClick={() => onSwitch("signin")}
                        className="auth-cta w-full py-3.5 rounded-full text-white font-bold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--brand-mid)_28%,transparent)] hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-mid) 100%)" }}
                    >
                        Back to Sign In
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="auth-field text-[20px] font-extrabold mb-1 text-brand-dark">
                        Forgot your password?
                    </h2>
                    <p className="auth-field text-sm mb-6 text-brand-dark/55">
                        No worries - enter your email and we&apos;ll send you a reset link.
                    </p>

                    {error && (
                        <div className="auth-field p-3 mb-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                        <AuthInput
                            id="reset-email"
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            icon={Mail}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="auth-cta w-full py-3.5 rounded-full text-white font-bold text-sm mt-1 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--brand-mid)_28%,transparent)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                            style={{ background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-mid) 100%)" }}
                        >
                            {loading
                                ? <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                    Sending link...
                                  </span>
                                : "Send Reset Link"
                            }
                        </button>
                    </form>

                    <p className="auth-footer-link text-center mt-5 text-sm text-brand-dark/60">
                        Remember your password?{" "}
                        <button
                            onClick={() => onSwitch("signin")}
                            className="font-bold hover:underline text-brand-mid"
                        >
                            Sign in
                        </button>
                    </p>
                </>
            )}
        </div>
    );
}
