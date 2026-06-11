"use client";

import { useRef, useState } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, Stethoscope, UserCog, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { signUp } from "@/lib/auth-client";
import { shakeField } from "@/lib/animations/auth";
import AushadhamLogo from "@/components/ui/logo";
import { AuthInput } from "./AuthInput";
import type { View } from "./types";

type Role = "patient" | "doctor";
const ROLES: { key: Role; label: string; icon: React.ElementType }[] = [
    { key: "patient", label: "Patient",           icon: User },
    { key: "doctor",  label: "Doctor / Dietitian", icon: Stethoscope },
];

export function SignUpView({ onSwitch, onSuccess }: { onSwitch: (v: View) => void; onSuccess: () => void }) {
    const [role, setRole]         = useState<Role>("patient");
    const [showPw, setShowPw]     = useState(false);
    const [agreed, setAgreed]     = useState(false);
    const [loading, setLoading]   = useState(false);
    const [pw, setPw]             = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName]   = useState("");
    const [email, setEmail]         = useState("");
    const [phone, setPhone]         = useState("");
    const [error, setError]         = useState("");
    const pwMatch = confirmPw === "" || pw === confirmPw;
    const pillRef        = useRef<HTMLDivElement>(null);
    const roleSelectorRef = useRef<HTMLDivElement>(null);

    function handleRoleChange(newRole: Role) {
        if (newRole === role) return;
        const idx = ROLES.findIndex(r => r.key === newRole);
        if (pillRef.current && roleSelectorRef.current) {
            const totalW  = roleSelectorRef.current.offsetWidth;
            const padding = 4;
            const pillW   = (totalW - padding * 2) / 2;
            gsap.to(pillRef.current, { x: idx * pillW, duration: 0.32, ease: "power2.inOut" });
        }
        setRole(newRole);
    }

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError("");
        if (!agreed) {
            const el = document.querySelector<HTMLElement>(".auth-terms-row");
            if (el) shakeField(el);
            return;
        }
        if (!pwMatch || confirmPw === "") return;
        setLoading(true);

        const { error: signUpError } = await signUp.email({
            email,
            password: pw,
            name: `${firstName} ${lastName}`.trim(),
            phone: phone || undefined,
            role,
        } as Parameters<typeof signUp.email>[0]);
        if (signUpError) {
            setError(signUpError.message || "Sign up failed");
            setLoading(false);
        } else if (role === "doctor") {
            setLoading(false);
            onSwitch("doctor-onboarding");
        } else {
            onSuccess();
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="lg:hidden auth-logo flex justify-center mb-3">
                <AushadhamLogo variant="teal" size="sm" />
            </div>

            <h2 className="auth-field text-[20px] font-extrabold mb-1 text-brand-dark">
                Create your account
            </h2>
            <p className="auth-field text-sm mb-4 text-brand-dark/55">
                Join Aushadham - your health companion
            </p>

            {error && (
                <div className="auth-field p-3 mb-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* Role selector */}
            <div
                ref={roleSelectorRef}
                className="auth-field relative grid grid-cols-2 p-1 mb-4 rounded-full bg-brand-surface"
            >
                <div
                    ref={pillRef}
                    className="absolute rounded-full pointer-events-none bg-brand-mid"
                    style={{
                        top: 4, bottom: 4, left: 4,
                        width: "calc(50% - 4px)",
                        boxShadow: "0 4px 14px color-mix(in srgb, var(--brand-mid) 28%, transparent)",
                    }}
                />
                {ROLES.map(({ key, label, icon: Icon }) => {
                    const active = role === key;
                    return (
                        <button
                            key={key} id={`role-tab-${key}`} type="button"
                            onClick={() => handleRoleChange(key)}
                            className={`relative z-10 flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-colors duration-200 ${active ? "text-white" : "text-brand-dark/55"}`}
                            aria-pressed={active}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    );
                })}
            </div>

            {role === "doctor" && (
                <div className="auth-field flex items-start gap-2 px-3 py-2 rounded-2xl mb-2 bg-brand-surface-alt border border-brand-surface-deep">
                    <UserCog size={13} className="text-brand-mid shrink-0" style={{ marginTop: "1px" }} />
                    <p className="text-[11px] leading-relaxed text-brand-dark">
                        You&apos;ll complete a <strong>Doctor Onboarding</strong> form after this step.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
                <div className="grid grid-cols-2 gap-3">
                    <AuthInput id="firstName" label="First Name" placeholder="First" icon={User}
                        value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <AuthInput id="lastName" label="Last Name" placeholder="Last" icon={User}
                        value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>

                <AuthInput id="email" label="Email" type="email" placeholder="you@example.com" icon={Mail}
                    value={email} onChange={e => setEmail(e.target.value)} />
                <AuthInput id="phone" label="Phone Number" type="tel" placeholder="+91 XXXXX XXXXX" icon={Phone} required={false}
                    value={phone} onChange={e => setPhone(e.target.value)} />
                <AuthInput
                    id="signup-password" label="Password"
                    type={showPw ? "text" : "password"} placeholder="Create a strong password" icon={Lock}
                    rightSlot={
                        <button type="button" onClick={() => setShowPw(v => !v)}
                            className="text-gray-400 hover:text-brand-mid transition-colors"
                            aria-label="Toggle password visibility">
                            {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                    }
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                />

                <div className="auth-field flex flex-col gap-1.5">
                    <label htmlFor="signup-confirm-password" className="text-sm font-semibold text-brand-dark">
                        Re-enter Password<span className="text-brand-mid">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: confirmPw === "" ? "var(--brand-mid)" : pwMatch ? "#22c55e" : "#ef4444" }}>
                            <Lock size={15} />
                        </span>
                        <input
                            id="signup-confirm-password" name="signup-confirm-password"
                            type={showPw ? "text" : "password"} placeholder="Repeat your password"
                            autoComplete="new-password"
                            required value={confirmPw}
                            onChange={(e) => setConfirmPw(e.target.value)}
                            className="w-full pl-11 pr-12 py-3 rounded-full border text-sm outline-none transition-all duration-200 text-brand-dark bg-brand-input-bg"
                            style={{
                                borderColor: confirmPw === "" ? "#e5e7eb" : pwMatch ? "#22c55e" : "#ef4444",
                                boxShadow: confirmPw !== "" ? (pwMatch ? "0 0 0 3px rgba(34,197,94,0.12)" : "0 0 0 3px rgba(239,68,68,0.12)") : "none",
                            }}
                            onFocus={e => {
                                if (confirmPw === "") { e.currentTarget.style.borderColor = "var(--brand-mid)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--brand-mid-ring)"; }
                            }}
                            onBlur={e => {
                                if (confirmPw === "") { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }
                            }}
                        />
                        {confirmPw !== "" && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: pwMatch ? "#22c55e" : "#ef4444" }}>
                                {pwMatch ? "✓" : "✗"}
                            </span>
                        )}
                    </div>
                    {!pwMatch && confirmPw !== "" && (
                        <p className="text-xs" style={{ color: "#ef4444" }}>Passwords do not match</p>
                    )}
                </div>

                {/* Terms */}
                <div className="auth-terms-row auth-field flex items-start gap-2">
                    <button
                        type="button" onClick={() => setAgreed(v => !v)}
                        className="mt-0.5 shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200"
                        style={agreed
                            ? { backgroundColor: "var(--brand-mid)", borderColor: "var(--brand-mid)" }
                            : { backgroundColor: "white", borderColor: "#d1d5db" }
                        }
                        aria-checked={agreed} role="checkbox"
                    >
                        {agreed && <CheckCircle2 size={12} className="text-white" />}
                    </button>
                    <p className="text-xs leading-relaxed text-brand-dark/60">
                        I agree to Aushadham&apos;s{" "}
                        <span className="font-semibold cursor-pointer hover:underline text-brand-mid">Terms of Service</span>
                        {" "}and{" "}
                        <span className="font-semibold cursor-pointer hover:underline text-brand-mid">Privacy Policy</span>
                    </p>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="auth-cta w-full py-3.5 rounded-full text-white font-bold text-sm mt-1 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--brand-mid)_28%,transparent)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-mid) 100%)" }}
                >
                    {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            {role === "doctor" ? "Continuing..." : "Creating account..."}
                        </span>
                        : role === "doctor" ? "Continue to Doctor Profile →" : "Create Account"
                    }
                </button>
            </form>

            <p className="auth-footer-link text-center mt-4 text-sm text-brand-dark/60">
                Already have an account?{" "}
                <button onClick={() => onSwitch("signin")}
                    className="font-bold hover:underline text-brand-mid">
                    Sign in
                </button>
            </p>
        </div>
    );
}
