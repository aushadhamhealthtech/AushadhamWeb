"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import AushadhamLogo from "@/components/ui/logo";
import { AuthInput } from "./AuthInput";
import type { View } from "./types";

export function SignInView({ onSwitch, onSuccess }: { onSwitch: (v: View) => void; onSuccess: () => void }) {
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { error: signInError } = await signIn.email({ email, password, rememberMe: remember });
        if (signInError) {
            setError(signInError.message || "Sign in failed");
        } else {
            onSuccess();
        }
        setLoading(false);
    }

    return (
        <div>
            <div className="lg:hidden auth-logo flex justify-center mb-4">
                <AushadhamLogo variant="teal" size="sm" />
            </div>

            <h2 className="auth-field text-[20px] font-extrabold mb-1 text-brand-dark">
                Welcome back
            </h2>
            <p className="auth-field text-sm mb-5 text-brand-dark/55">
                Sign in to your Aushadham account
            </p>

            {error && (
                <div className="auth-field p-3 mb-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                <AuthInput
                    id="email" label="Email" type="email" placeholder="you@example.com" icon={Mail}
                    value={email} onChange={e => setEmail(e.target.value)}
                />
                <AuthInput
                    id="signin-password" label="Password"
                    type={showPw ? "text" : "password"} placeholder="Your password" icon={Lock}
                    value={password} onChange={e => setPassword(e.target.value)}
                    rightSlot={
                        <button type="button" onClick={() => setShowPw(v => !v)}
                            className="text-gray-400 hover:text-brand-mid transition-colors"
                            aria-label={showPw ? "Hide password" : "Show password"}>
                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    }
                />

                <div className="auth-field flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="accent-brand-mid rounded" />
                        <span className="text-brand-dark/60">Remember me</span>
                    </label>
                    <button type="button" className="font-semibold hover:underline text-brand-mid"
                        onClick={() => onSwitch("forgot-password")}>
                        Forgot password?
                    </button>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="auth-cta w-full py-3.5 rounded-full text-white font-bold text-sm mt-1 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--brand-mid)_28%,transparent)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-mid) 100%)" }}
                >
                    {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Signing in...
                        </span>
                        : "Sign In"
                    }
                </button>
            </form>

            <p className="auth-footer-link text-center mt-4 text-sm text-brand-dark/60">
                Don&apos;t have an account?{" "}
                <button onClick={() => onSwitch("signup")}
                    className="font-bold hover:underline text-brand-mid">
                    Sign up
                </button>
            </p>
        </div>
    );
}
