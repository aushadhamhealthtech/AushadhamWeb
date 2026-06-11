"use client";

import { useState } from "react";
import { ArrowLeft, Building2, MapPin, Clock, FileText, GraduationCap } from "lucide-react";
import { useAuthModal } from "@/lib/context/auth-modal";
import { AuthInput } from "./AuthInput";
import type { View } from "./types";

export function DoctorOnboardingView({ onSwitch }: { onSwitch: (v: View) => void }) {
    const [loading, setLoading] = useState(false);
    const { closeModal } = useAuthModal();

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); closeModal(); }, 1500);
    }

    return (
        <div>
            <button onClick={() => onSwitch("signup")}
                className="auth-field flex items-center gap-1.5 text-xs font-semibold mb-3 hover:underline text-brand-mid">
                <ArrowLeft size={12} /> Back to sign up
            </button>

            <div className="auth-field flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-brand-mid"
                        style={{ backgroundColor: "color-mix(in srgb, var(--brand-mid) 14%, transparent)" }}>1</div>
                    <span className="text-xs font-semibold text-brand-dark/40">Basic Info</span>
                </div>
                <div className="flex-1 h-px bg-brand-mid opacity-50" />
                <div className="w-4 h-4 rounded-full flex items-center justify-center bg-brand-mid">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div className="flex-1 h-px bg-brand-mid" />
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold bg-brand-mid text-white">2</div>
                    <span className="text-xs font-bold text-brand-dark">Doctor Profile</span>
                </div>
            </div>

            <h2 className="auth-field text-[18px] font-extrabold mb-0.5 text-brand-dark">
                Your professional profile
            </h2>
            <p className="auth-field text-xs mb-3 text-brand-dark/55">
                Verified by our medical team before you go live.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5" noValidate>
                <AuthInput id="regNumber"       label="Medical Registration Number" placeholder="MCI-XXXXXXXX"              icon={FileText} />
                <AuthInput id="specialization"  label="Specialization"              placeholder="e.g. Ayurveda, Cardiology" icon={GraduationCap} />

                <div className="grid grid-cols-2 gap-2">
                    <AuthInput id="experience" label="Years of Experience" type="number" placeholder="e.g. 5"    icon={Clock} />
                    <AuthInput id="location"   label="City / Location"                  placeholder="e.g. Mumbai" icon={MapPin} />
                </div>

                <AuthInput id="clinic" label="Clinic / Hospital Name" placeholder="Your clinic or hospital" icon={Building2} />

                <div className="auth-field flex flex-col gap-1">
                    <label htmlFor="bio" className="text-xs font-semibold text-brand-dark">
                        Professional Bio<span className="text-brand-mid">*</span>
                    </label>
                    <textarea
                        id="bio" name="bio" rows={2}
                        placeholder="Brief introduction about your practice and expertise..."
                        className="w-full px-4 py-2 rounded-2xl border border-[#e5e7eb] text-sm outline-none transition-all duration-200 resize-none text-brand-dark bg-brand-input-bg focus:border-brand-mid focus:shadow-[0_0_0_3px_var(--brand-mid-ring)]"
                    />
                </div>

                <button
                    type="submit" disabled={loading}
                    className="auth-cta w-full py-2.5 rounded-full text-white font-bold text-sm mt-0.5 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[0_4px_14px_color-mix(in_srgb,var(--brand-mid)_28%,transparent)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-mid) 100%)" }}
                >
                    {loading
                        ? <span className="flex items-center justify-center gap-2">
                            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Submitting application...
                        </span>
                        : "Submit Application"
                    }
                </button>
            </form>

            <p className="auth-footer-link text-[10px] text-center mt-2 text-brand-dark/40">
                Our team reviews credentials within 24-48 hours. You&apos;ll receive an email once verified.
            </p>
        </div>
    );
}
