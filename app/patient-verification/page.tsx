"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, BadgeCheck, Lock, RotateCcw, Smartphone } from "lucide-react";

const C = {
    primary: "#065b4b",
    mid: "#228573",
    light: "#3aa692",
    border: "#d9e7e2",
    bg: "#f8fffe",
    muted: "rgba(6,91,75,0.56)",
};

function Logo({ variant = "teal" }: { variant?: "teal" | "white" }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className="w-8 h-8 rounded-full"
                style={{ background: variant === "white" ? "rgba(255,255,255,0.16)" : `linear-gradient(135deg, ${C.primary}, ${C.light})` }}
            />
            <span className="text-xs font-black tracking-widest" style={{ color: variant === "white" ? "white" : C.primary }}>
                AUSHADHAM
            </span>
        </div>
    );
}

function LeftPanel() {
    const artRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!artRef.current) return;
        const dots = artRef.current.querySelectorAll(".pv-float");
        dots.forEach((dot, i) => {
            gsap.to(dot, {
                y: i % 2 === 0 ? -8 : 8,
                x: i % 3 === 0 ? 4 : -4,
                duration: 2.8 + i * 0.45,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            });
        });
    }, []);

    return (
        <aside
            className="hidden lg:flex w-[300px] shrink-0 px-8 py-9 flex-col justify-between relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #032f27 0%, #065b4b 45%, #228573 100%)" }}
        >
            <div className="absolute top-[-52px] left-[-54px] w-[220px] h-[220px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #6ee7ca 0%, transparent 72%)" }} />
            <div className="absolute bottom-[-68px] right-[-40px] w-[200px] h-[200px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #9decd5 0%, transparent 72%)" }} />

            <Logo variant="white" />

            <div className="relative z-10 my-4">
                <svg ref={artRef} viewBox="0 0 240 240" className="w-full max-w-[210px] mx-auto" fill="none">
                    <circle cx="120" cy="120" r="98" fill="white" opacity="0.05" />
                    <rect x="62" y="72" width="116" height="78" rx="14" fill="white" opacity="0.11" stroke="white" strokeWidth="1.5" />
                    <path d="M62 88 L120 124 L178 88" stroke="white" strokeOpacity="0.62" strokeWidth="2.7" strokeLinecap="round" />
                    <rect x="97" y="146" width="46" height="38" rx="10" fill="white" opacity="0.15" />
                    <path d="M107 146 L107 136 C107 124 133 124 133 136 L133 146" stroke="white" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="120" cy="160" r="5" fill="#228573" />
                    <line x1="120" y1="166" x2="120" y2="176" stroke="#228573" strokeWidth="3" strokeLinecap="round" />
                    <circle className="pv-float" cx="37" cy="62" r="4" fill="white" opacity="0.24" />
                    <circle className="pv-float" cx="205" cy="80" r="5" fill="white" opacity="0.2" />
                    <circle className="pv-float" cx="31" cy="180" r="6" fill="white" opacity="0.14" />
                    <circle className="pv-float" cx="210" cy="190" r="4" fill="white" opacity="0.2" />
                </svg>
            </div>

            <div className="space-y-2 relative z-10">
                <h2 className="text-white text-[23px] font-black leading-tight">Secure OTP verification</h2>
                <p className="text-white/70 text-sm leading-relaxed">One quick check, then we prefill your profile and get you ready to book faster.</p>
            </div>
        </aside>
    );
}

export default function PatientVerificationPage() {
    const router = useRouter();
    const rootRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(40);
    const [loading, setLoading] = useState(false);
    const [maskedPhone] = useState(() => {
        if (typeof window === "undefined") return "+91 XXXXXX3405";
        const draft = sessionStorage.getItem("aushadham_patient_signup");
        if (!draft) return "+91 XXXXXX3405";
        try {
            const parsed = JSON.parse(draft) as { phone?: string };
            if (!parsed.phone) return "+91 XXXXXX3405";
            const digits = parsed.phone.replace(/\D/g, "");
            const tail = digits.slice(-4);
            return tail ? `+91 XXXXXX${tail}` : "+91 XXXXXX3405";
        } catch {
            return "+91 XXXXXX3405";
        }
    });

    useEffect(() => {
        const root = rootRef.current;
        const card = cardRef.current;
        if (!root || !card) return;
        gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
        gsap.fromTo(card, { x: 24, opacity: 0.85 }, { x: 0, opacity: 1, duration: 0.46, ease: "power3.out", delay: 0.06 });
    }, []);

    useEffect(() => {
        if (timer <= 0) return;
        const t = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(t);
    }, [timer]);

    function handleResend() {
        if (timer > 0) return;
        // TODO(backend): resend OTP endpoint integration.
        setTimer(40);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (otp.length < 4) return;
        setLoading(true);
        // TODO(backend): verify OTP and exchange auth session.
        setTimeout(() => {
            setLoading(false);
            router.push("/patient-profile-setup");
        }, 900);
    }

    return (
        <main ref={rootRef} className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: C.bg }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-4 lg:hidden"><Logo /></div>

                <div className="rounded-[30px] overflow-hidden border bg-white" style={{ borderColor: C.border, boxShadow: "0 18px 52px rgba(6,91,75,0.12)" }}>
                    <div className="flex min-h-[74vh]">
                        <LeftPanel />

                        <section ref={cardRef} className="flex-1 px-5 py-7 sm:px-10 sm:py-10 flex flex-col justify-center">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="inline-flex items-center gap-1 text-xs font-semibold mb-6 w-fit"
                                style={{ color: C.mid }}
                            >
                                <ArrowLeft size={14} /> Back
                            </button>

                            <div className="max-w-[520px]">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4" style={{ backgroundColor: "#e8f5f2", color: C.primary }}>
                                    <BadgeCheck size={14} /> Verification Step
                                </div>

                                <h1 className="text-[33px] sm:text-[38px] font-black leading-tight" style={{ color: C.primary }}>
                                    Verify your account
                                </h1>
                                <p className="mt-2 text-sm sm:text-[15px] leading-relaxed" style={{ color: C.muted }}>
                                    Enter the OTP sent to your phone <span className="font-semibold" style={{ color: C.primary }}>{maskedPhone}</span>. This keeps your profile secure.
                                </p>

                                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                                    <label htmlFor="otp" className="text-sm font-semibold" style={{ color: C.primary }}>
                                        6-digit OTP
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: C.mid }}>
                                            <Smartphone size={15} />
                                        </span>
                                        <input
                                            id="otp"
                                            name="otp"
                                            autoComplete="one-time-code"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                                            placeholder="Enter OTP"
                                            className="w-full pl-11 pr-11 py-3.5 rounded-full border text-sm outline-none"
                                            style={{ borderColor: C.border, backgroundColor: "#fafffe", color: C.primary }}
                                            onFocus={(e) => {
                                                e.currentTarget.style.borderColor = C.mid;
                                                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)";
                                            }}
                                            onBlur={(e) => {
                                                e.currentTarget.style.borderColor = C.border;
                                                e.currentTarget.style.boxShadow = "none";
                                            }}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(6,91,75,0.38)" }}>
                                            <Lock size={15} />
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={otp.length < 4 || loading}
                                        className="mt-1 w-full py-3.5 rounded-full text-white text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                                        style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.mid} 100%)`, boxShadow: "0 10px 26px rgba(34,133,115,0.28)" }}
                                    >
                                        {loading ? "Verifying..." : "Verify and Continue"}
                                    </button>
                                </form>

                                <div className="mt-6 flex items-center justify-between text-xs sm:text-sm">
                                    <span style={{ color: C.muted }}>Did not receive OTP?</span>
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        disabled={timer > 0}
                                        className="inline-flex items-center gap-1.5 font-semibold disabled:opacity-60"
                                        style={{ color: timer > 0 ? C.muted : C.mid }}
                                    >
                                        <RotateCcw size={13} />
                                        {timer > 0 ? `Resend in 00:${String(timer).padStart(2, "0")}` : "Resend OTP"}
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
