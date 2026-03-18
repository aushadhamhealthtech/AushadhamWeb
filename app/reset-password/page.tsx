"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import { resetPassword } from "@/lib/auth-client";
import AushadhamLogo from "@/components/ui/logo";
import Link from "next/link";

type PageState = "loading" | "form" | "success" | "error";

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center"
                style={{ background: "linear-gradient(160deg, #f0faf7 0%, #e8f5f2 50%, #ffffff 100%)" }}>
                <div className="w-8 h-8 rounded-full border-3 border-[#e8f5f2] border-t-[#228573] animate-spin" />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");
    const urlError = searchParams.get("error");

    const [pageState, setPageState] = useState<PageState>("loading");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const passwordsMatch = confirmPassword === "" || newPassword === confirmPassword;
    const passwordLongEnough = newPassword.length >= 8;

    // Validate token on mount
    useEffect(() => {
        if (urlError === "INVALID_TOKEN") {
            setErrorMsg("This reset link is invalid or has expired. Please request a new one.");
            setPageState("error");
        } else if (!token) {
            setErrorMsg("No reset token found. Please request a new password reset link.");
            setPageState("error");
        } else {
            setPageState("form");
        }
    }, [token, urlError]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg("");

        if (!passwordLongEnough) {
            setErrorMsg("Password must be at least 8 characters.");
            return;
        }
        if (!passwordsMatch || confirmPassword === "") {
            setErrorMsg("Passwords do not match.");
            return;
        }
        if (!token) return;

        setSubmitting(true);
        const { error } = await resetPassword({ newPassword, token });
        setSubmitting(false);

        if (error) {
            setErrorMsg(error.message || "Failed to reset password. The link may have expired.");
        } else {
            setPageState("success");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12"
            style={{ background: "linear-gradient(160deg, #f0faf7 0%, #e8f5f2 50%, #ffffff 100%)" }}>

            <div className="w-full max-w-110 flex flex-col items-center gap-8">
                {/* Logo */}
                <Link href="/" aria-label="Go to homepage">
                    <AushadhamLogo variant="teal" size="md" />
                </Link>

                {/* Card */}
                <div className="w-full bg-white rounded-3xl shadow-lg border border-[#e8f5f2] p-8 md:p-10">

                    {/* Loading state */}
                    {pageState === "loading" && (
                        <div className="flex flex-col items-center gap-4 py-8">
                            <div className="w-8 h-8 rounded-full border-3 border-[#e8f5f2] border-t-[#228573] animate-spin" />
                            <p className="text-sm" style={{ color: "rgba(6,91,75,0.6)" }}>Verifying reset link...</p>
                        </div>
                    )}

                    {/* Error state — invalid/expired token */}
                    {pageState === "error" && (
                        <div className="flex flex-col items-center text-center gap-5 py-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: "#fef2f2" }}>
                                <AlertTriangle size={28} style={{ color: "#ef4444" }} />
                            </div>
                            <div>
                                <h1 className="text-xl font-extrabold mb-2" style={{ color: "#065b4b" }}>
                                    Link expired
                                </h1>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(6,91,75,0.6)" }}>
                                    {errorMsg}
                                </p>
                            </div>
                            <Link
                                href="/"
                                className="w-full py-3.5 rounded-full text-white font-bold text-sm text-center transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5 block"
                                style={{ background: "linear-gradient(135deg, #065b4b 0%, #228573 100%)" }}
                            >
                                Back to Home
                            </Link>
                        </div>
                    )}

                    {/* Success state */}
                    {pageState === "success" && (
                        <div className="flex flex-col items-center text-center gap-5 py-4">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                                style={{ background: "linear-gradient(135deg, #065b4b 0%, #3aa692 100%)", boxShadow: "0 8px 32px rgba(34,133,115,0.32)" }}>
                                <CheckCircle2 size={36} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-[22px] font-extrabold mb-2" style={{ color: "#065b4b" }}>
                                    Password reset!
                                </h1>
                                <p className="text-sm leading-relaxed" style={{ color: "rgba(6,91,75,0.6)" }}>
                                    Your password has been successfully changed. You can now sign in with your new password.
                                </p>
                            </div>
                            <button
                                onClick={() => router.push("/")}
                                className="w-full py-3.5 rounded-full text-white font-bold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(34,133,115,0.28)] hover:-translate-y-0.5"
                                style={{ background: "linear-gradient(135deg, #065b4b 0%, #228573 100%)" }}
                            >
                                Go to Sign In
                            </button>
                        </div>
                    )}

                    {/* Form state */}
                    {pageState === "form" && (
                        <>
                            <div className="mb-6">
                                <h1 className="text-[22px] font-extrabold mb-1" style={{ color: "#065b4b" }}>
                                    Set new password
                                </h1>
                                <p className="text-sm" style={{ color: "rgba(6,91,75,0.55)" }}>
                                    Your new password must be at least 8 characters.
                                </p>
                            </div>

                            {errorMsg && (
                                <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                    {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                                {/* New Password */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="new-password" className="text-sm font-semibold" style={{ color: "#065b4b" }}>
                                        New Password<span className="ml-0.5" style={{ color: "#228573" }}>*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#228573" }}>
                                            <Lock size={15} />
                                        </span>
                                        <input
                                            id="new-password"
                                            name="new-password"
                                            type={showPw ? "text" : "password"}
                                            placeholder="Enter new password"
                                            autoComplete="new-password"
                                            required
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            className="w-full pl-11 pr-12 py-3 rounded-full border border-[#e5e7eb] text-sm text-[#065b4b] bg-[#fafffe] outline-none transition-all duration-200 focus:border-[#228573] focus:shadow-[0_0_0_3px_rgba(34,133,115,0.12)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPw(v => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#228573] transition-colors"
                                            aria-label={showPw ? "Hide password" : "Show password"}
                                        >
                                            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                    {newPassword.length > 0 && !passwordLongEnough && (
                                        <p className="text-xs" style={{ color: "#ef4444" }}>Must be at least 8 characters</p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="confirm-password" className="text-sm font-semibold" style={{ color: "#065b4b" }}>
                                        Confirm Password<span className="ml-0.5" style={{ color: "#228573" }}>*</span>
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                                            style={{ color: confirmPassword === "" ? "#228573" : passwordsMatch ? "#22c55e" : "#ef4444" }}>
                                            <Lock size={15} />
                                        </span>
                                        <input
                                            id="confirm-password"
                                            name="confirm-password"
                                            type={showPw ? "text" : "password"}
                                            placeholder="Repeat new password"
                                            autoComplete="new-password"
                                            required
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            className="w-full pl-11 pr-12 py-3 rounded-full border text-sm text-[#065b4b] bg-[#fafffe] outline-none transition-all duration-200"
                                            style={{
                                                borderColor: confirmPassword === "" ? "#e5e7eb" : passwordsMatch ? "#22c55e" : "#ef4444",
                                                boxShadow: confirmPassword !== "" ? (passwordsMatch ? "0 0 0 3px rgba(34,197,94,0.12)" : "0 0 0 3px rgba(239,68,68,0.12)") : "none",
                                            }}
                                        />
                                        {confirmPassword !== "" && (
                                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold"
                                                style={{ color: passwordsMatch ? "#22c55e" : "#ef4444" }}>
                                                {passwordsMatch ? "\u2713" : "\u2717"}
                                            </span>
                                        )}
                                    </div>
                                    {!passwordsMatch && confirmPassword !== "" && (
                                        <p className="text-xs" style={{ color: "#ef4444" }}>Passwords do not match</p>
                                    )}
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={submitting || !passwordLongEnough || !passwordsMatch || confirmPassword === ""}
                                    className="w-full py-3.5 rounded-full text-white font-bold text-sm mt-2 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(34,133,115,0.28)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{ background: "linear-gradient(135deg, #065b4b 0%, #228573 100%)" }}
                                >
                                    {submitting
                                        ? <span className="flex items-center justify-center gap-2">
                                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                                            Resetting password...
                                        </span>
                                        : "Reset Password"
                                    }
                                </button>
                            </form>

                            <p className="text-center mt-5 text-sm" style={{ color: "rgba(6,91,75,0.6)" }}>
                                <Link href="/" className="inline-flex items-center gap-1.5 font-bold hover:underline" style={{ color: "#228573" }}>
                                    <ArrowLeft size={14} />
                                    Back to Home
                                </Link>
                            </p>
                        </>
                    )}
                </div>

                {/* Footer text */}
                <p className="text-xs text-center" style={{ color: "rgba(6,91,75,0.4)" }}>
                    &copy; {new Date().getFullYear()} Aushadham. All rights reserved.
                </p>
            </div>
        </div>
    );
}
