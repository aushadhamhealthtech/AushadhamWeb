"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowRight, Camera, Calendar, UploadCloud, UserRound } from "lucide-react";
import { OnboardingLogo } from "@/components/onboarding/logo";
import { PillInput, PillSelect } from "@/components/onboarding/primitives";

const C = {
    primary: "#065b4b",
    mid:     "#228573",
    light:   "#3aa692",
    mint:    "#e8f5f2",
    border:  "#d9e7e2",
    bg:      "#f8fffe",
    muted:   "rgba(6,91,75,0.56)",
};

const GENDERS   = ["Male", "Female", "Other", "Prefer not to say"];
const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Marathi", "Bengali"];

type Draft = {
    fullName:            string;
    dob:                 string;
    gender:              string;
    occupation:          string;
    phone:               string;
    email:               string;
    address:             string;
    emergencyPhone:      string;
    languages:           string[];
    profilePhotoName:    string;
    profilePhotoPreview: string;
};

const EMPTY_DRAFT: Draft = {
    fullName: "", dob: "", gender: "", occupation: "",
    phone: "", email: "", address: "", emergencyPhone: "",
    languages: ["English"], profilePhotoName: "", profilePhotoPreview: "",
};

function getInitialDraft(): Draft {
    if (typeof window === "undefined") return EMPTY_DRAFT;

    let next = { ...EMPTY_DRAFT };

    const signup  = sessionStorage.getItem("aushadham_patient_signup");
    const profile = sessionStorage.getItem("aushadham_patient_profile_draft");

    if (signup) {
        try {
            const parsed = JSON.parse(signup) as {
                fullName?: string; firstName?: string; lastName?: string;
                email?: string; phone?: string;
            };
            next = {
                ...next,
                fullName: parsed.fullName || `${parsed.firstName ?? ""} ${parsed.lastName ?? ""}`.trim() || next.fullName,
                email:    parsed.email || next.email,
                phone:    parsed.phone || next.phone,
            };
        } catch { /* ignore malformed cache */ }
    }

    if (profile) {
        try { next = JSON.parse(profile) as Draft; }
        catch { /* ignore malformed cache */ }
    }

    return next;
}

function LeftPanel() {
    return (
        <aside
            className="hidden lg:flex w-[300px] shrink-0 px-8 py-9 flex-col justify-between relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #032f27 0%, #065b4b 45%, #228573 100%)" }}
        >
            <div className="absolute top-[-62px] left-[-62px] w-[220px] h-[220px] rounded-full opacity-15"
                style={{ background: "radial-gradient(circle, #77e8ca 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-70px] right-[-48px] w-[210px] h-[210px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #96f0d6 0%, transparent 72%)" }} />

            <OnboardingLogo variant="white" />

            <div className="my-5 px-1">
                <h2 className="text-[24px] text-white font-black leading-tight">Personal profile setup</h2>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                    We auto-filled whatever we already know from signup. Complete this once, booking gets much quicker.
                </p>
            </div>

            <div className="rounded-3xl p-4 border border-white/20 bg-white/10 backdrop-blur-sm">
                <p className="text-white text-xs uppercase tracking-[0.16em] mb-2">Step 1 of 2</p>
                <p className="text-white text-sm font-semibold">Personal Details</p>
                <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "48%", background: "linear-gradient(90deg, #84ffe0, #d6fff2)" }} />
                </div>
            </div>
        </aside>
    );
}

function LanguagePicker({ values, onChange }: { values: string[]; onChange: (v: string[]) => void }) {
    function toggle(lang: string) {
        onChange(values.includes(lang) ? values.filter(x => x !== lang) : [...values, lang]);
    }

    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold" style={{ color: C.primary }}>Preferred Languages</label>
            <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => {
                    const active = values.includes(lang);
                    return (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => toggle(lang)}
                            className="px-3.5 py-1.5 rounded-full border text-xs font-semibold transition-all"
                            style={{
                                borderColor:     active ? C.mid    : C.border,
                                backgroundColor: active ? C.mint   : "white",
                                color:           active ? C.primary : C.muted,
                            }}
                        >
                            {lang}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default function PatientProfileSetupPage() {
    const router  = useRouter();
    const pageRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const [draft, setDraft] = useState<Draft>(() => getInitialDraft());

    useEffect(() => {
        const root = pageRef.current;
        const body = bodyRef.current;
        if (!root || !body) return;
        gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
        gsap.fromTo(body, { y: 20, opacity: 0.84 }, { y: 0, opacity: 1, duration: 0.46, ease: "power3.out", delay: 0.05 });
    }, []);

    const set = (key: keyof Draft) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setDraft(prev => ({ ...prev, [key]: e.target.value }));

    function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setDraft(prev => ({
                ...prev,
                profilePhotoName:    file.name,
                profilePhotoPreview: typeof reader.result === "string" ? reader.result : "",
            }));
        };
        reader.readAsDataURL(file);
    }

    function handleNext() {
        sessionStorage.setItem("aushadham_patient_profile_draft", JSON.stringify(draft));
        // TODO(backend): optionally persist personal details to API before navigating.
        // e.g. await fetch('/api/patients/profile', { method: 'PATCH', body: JSON.stringify(draft) });
        router.push("/patient-profile-setup/health");
    }

    return (
        <main ref={pageRef} className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: C.bg }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-4 lg:hidden"><OnboardingLogo /></div>

                <div className="rounded-[30px] overflow-hidden border bg-white"
                    style={{ borderColor: C.border, boxShadow: "0 18px 52px rgba(6,91,75,0.12)" }}>
                    <div className="flex min-h-[78vh]">
                        <LeftPanel />

                        <section ref={bodyRef} className="flex-1 px-5 py-7 sm:px-10 sm:py-9">
                            <div className="max-w-[760px]">
                                <h1 className="text-[30px] sm:text-[36px] font-black leading-tight" style={{ color: C.primary }}>
                                    Complete your patient profile
                                </h1>
                                <p className="text-sm mt-2" style={{ color: C.muted }}>
                                    We have prefilled your signup details. Review and add the remaining fields.
                                </p>

                                {/* Profile photo */}
                                <div className="mt-6 rounded-2xl p-4 border bg-[#f8fffd]" style={{ borderColor: C.border }}>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 rounded-full border overflow-hidden flex items-center justify-center bg-white"
                                            style={{ borderColor: C.border }}>
                                            {draft.profilePhotoPreview ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={draft.profilePhotoPreview} alt="Profile preview" className="w-full h-full object-cover" />
                                            ) : (
                                                <UserRound size={34} style={{ color: C.muted }} />
                                            )}
                                            <label
                                                htmlFor="profilePhoto"
                                                className="absolute bottom-0 right-0 w-7 h-7 rounded-full flex items-center justify-center text-white cursor-pointer"
                                                style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.mid})` }}
                                            >
                                                <Camera size={13} />
                                            </label>
                                            <input id="profilePhoto" type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold" style={{ color: C.primary }}>Upload profile picture</p>
                                            <p className="text-xs" style={{ color: C.muted }}>JPG/PNG recommended. This helps doctors identify you quickly.</p>
                                            {draft.profilePhotoName && (
                                                <p className="text-xs mt-1 inline-flex items-center gap-1.5" style={{ color: C.mid }}>
                                                    <UploadCloud size={13} /> {draft.profilePhotoName}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Form fields */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <PillInput id="fullName"       label="Full Name"        placeholder="Enter your full name"     value={draft.fullName}       onChange={set("fullName")} />
                                    <PillInput id="phone"          label="Phone Number"     placeholder="+91 XXXXX XXXXX"          value={draft.phone}          onChange={set("phone")} />
                                    <PillInput id="dob"            label="Date of Birth"    placeholder="DD/MM/YYYY"               value={draft.dob}            onChange={set("dob")} rightIcon={<Calendar size={15} />} />
                                    <PillInput id="email"          label="Email"            placeholder="you@example.com"          value={draft.email}          onChange={set("email")} />

                                    <PillSelect
                                        label="Gender" id="gender"
                                        options={GENDERS} placeholder="Select Gender"
                                        value={draft.gender}
                                        onChange={(v) => setDraft(prev => ({ ...prev, gender: v }))}
                                    />

                                    <PillInput id="occupation"     label="Occupation"       placeholder="Your occupation"          value={draft.occupation}     onChange={set("occupation")} />

                                    <div className="md:col-span-2">
                                        <PillInput id="address" label="Postal Address" placeholder="Enter full address" value={draft.address} onChange={set("address")} />
                                    </div>

                                    <PillInput id="emergencyPhone" label="Emergency Contact" placeholder="Emergency phone number"  value={draft.emergencyPhone} onChange={set("emergencyPhone")} />

                                    <div className="md:col-span-2">
                                        <LanguagePicker values={draft.languages} onChange={(v) => setDraft(prev => ({ ...prev, languages: v }))} />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="px-7 py-3 rounded-full text-white text-sm font-bold inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.mid})`, boxShadow: "0 10px 26px rgba(34,133,115,0.28)" }}
                                    >
                                        Continue to Health Details <ArrowRight size={15} />
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
