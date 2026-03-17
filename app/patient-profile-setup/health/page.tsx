"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowLeft, CheckCircle2, Plus, UploadCloud } from "lucide-react";
import { OnboardingLogo } from "@/components/onboarding/logo";

const C = {
    primary: "#065b4b",
    mid: "#228573",
    light: "#3aa692",
    mint: "#e8f5f2",
    border: "#d9e7e2",
    bg: "#f8fffe",
    muted: "rgba(6,91,75,0.56)",
};

const HEALTH_OPTIONS = ["Diabetes", "Gastritis", "High BP", "Low BP", "Thyroid", "Migraine"];
const LIFESTYLE = ["Yoga", "Exercise", "Meditation", "Smoking", "Alcohol"];
const ALLERGIES = ["Food", "Dust", "Drug", "Skin", "Other"];
const VACCINES = ["Flu", "COVID-19", "Hepatitis B", "Tetanus", "Typhoid", "Pneumococcal"];

type HealthDraft = {
    presentIssues: string[];
    pastIssues: string[];
    onMedication: "yes" | "no" | "";
    hasAllergies: "yes" | "no" | "";
    allergyType: string;
    habitSelected: string[];
    vaccine: string;
    fileName: string;
    familyHistory: string[];
};

const EMPTY_HEALTH_DRAFT: HealthDraft = {
    presentIssues: [],
    pastIssues: [],
    onMedication: "",
    hasAllergies: "",
    allergyType: "",
    habitSelected: [],
    vaccine: "",
    fileName: "",
    familyHistory: [],
};

function getInitialFullName(): string {
    if (typeof window === "undefined") return "";
    const profile = sessionStorage.getItem("aushadham_patient_profile_draft");
    if (!profile) return "";
    try {
        const parsed = JSON.parse(profile) as { fullName?: string };
        return parsed.fullName ?? "";
    } catch {
        return "";
    }
}

function getInitialHealthDraft(): HealthDraft {
    if (typeof window === "undefined") return EMPTY_HEALTH_DRAFT;
    const health = sessionStorage.getItem("aushadham_patient_health_draft");
    if (!health) return EMPTY_HEALTH_DRAFT;
    try {
        return JSON.parse(health) as HealthDraft;
    } catch {
        return EMPTY_HEALTH_DRAFT;
    }
}


function LeftPanel({ fullName }: { fullName: string }) {
    return (
        <aside
            className="hidden lg:flex w-[300px] shrink-0 px-8 py-9 flex-col justify-between relative overflow-hidden"
            style={{ background: "linear-gradient(160deg, #032f27 0%, #065b4b 45%, #228573 100%)" }}
        >
            <div className="absolute top-[-62px] left-[-62px] w-[220px] h-[220px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #77e8ca 0%, transparent 70%)" }} />
            <div className="absolute bottom-[-70px] right-[-48px] w-[210px] h-[210px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #96f0d6 0%, transparent 72%)" }} />

            <OnboardingLogo variant="white" />

            <div className="my-5 px-1">
                <h2 className="text-[24px] text-white font-black leading-tight">Health profile setup</h2>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">
                    {fullName ? `${fullName.split(" ")[0]}, this` : "This"} helps personalize care recommendations and faster triage.
                </p>
            </div>

            <div className="rounded-3xl p-4 border border-white/20 bg-white/10 backdrop-blur-sm">
                <p className="text-white text-xs uppercase tracking-[0.16em] mb-2">Step 2 of 2</p>
                <p className="text-white text-sm font-semibold">Health Details</p>
                <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: "100%", background: "linear-gradient(90deg, #84ffe0, #d6fff2)" }} />
                </div>
            </div>
        </aside>
    );
}

function ChipRow({ title, options, value, onChange }: { title: string; options: string[]; value: string[]; onChange: (v: string[]) => void }) {
    function toggle(opt: string) {
        onChange(value.includes(opt) ? value.filter((x) => x !== opt) : [...value, opt]);
    }

    function addCustom() {
        const name = window.prompt("Enter custom value");
        if (!name || !name.trim()) return;
        const n = name.trim();
        if (!value.includes(n)) onChange([...value, n]);
    }

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold" style={{ color: C.primary }}>{title}</p>
            <div className="flex flex-wrap gap-2">
                {options.map((opt) => {
                    const active = value.includes(opt);
                    return (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => toggle(opt)}
                            className="px-3.5 py-1.5 rounded-full border text-xs font-semibold"
                            style={{ borderColor: active ? C.mid : C.border, backgroundColor: active ? C.mint : "white", color: active ? C.primary : C.muted }}
                        >
                            {opt}
                        </button>
                    );
                })}
                <button
                    type="button"
                    onClick={addCustom}
                    className="px-3.5 py-1.5 rounded-full border text-xs font-semibold inline-flex items-center gap-1.5"
                    style={{ borderColor: C.border, backgroundColor: "white", color: C.mid }}
                >
                    <Plus size={12} /> Add
                </button>
            </div>
        </div>
    );
}

function ToggleYesNo({ title, value, onChange }: { title: string; value: "yes" | "no" | ""; onChange: (v: "yes" | "no") => void }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold" style={{ color: C.primary }}>{title}</p>
            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => onChange("yes")}
                    className="px-4 py-1.5 rounded-full border text-xs font-semibold"
                    style={{ borderColor: value === "yes" ? C.mid : C.border, backgroundColor: value === "yes" ? C.mint : "white", color: value === "yes" ? C.primary : C.muted }}
                >
                    Yes
                </button>
                <button
                    type="button"
                    onClick={() => onChange("no")}
                    className="px-4 py-1.5 rounded-full border text-xs font-semibold"
                    style={{ borderColor: value === "no" ? C.mid : C.border, backgroundColor: value === "no" ? C.mint : "white", color: value === "no" ? C.primary : C.muted }}
                >
                    No
                </button>
            </div>
        </div>
    );
}

export default function PatientHealthDetailsPage() {
    const router = useRouter();
    const pageRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const [fullName] = useState(() => getInitialFullName());
    const [draft, setDraft] = useState<HealthDraft>(() => getInitialHealthDraft());

    useEffect(() => {
        const page = pageRef.current;
        const body = bodyRef.current;
        if (!page || !body) return;
        gsap.fromTo(page, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
        gsap.fromTo(body, { y: 20, opacity: 0.84 }, { y: 0, opacity: 1, duration: 0.46, ease: "power3.out", delay: 0.05 });
    }, []);

    function persistAndSubmit() {
        sessionStorage.setItem("aushadham_patient_health_draft", JSON.stringify(draft));
        // TODO(backend): submit health payload and mark patient profile completion.
        router.push("/");
    }

    function addFamilyHistory() {
        const val = window.prompt("Enter family medical history note");
        if (!val || !val.trim()) return;
        const note = val.trim();
        if (!draft.familyHistory.includes(note)) {
            setDraft((prev) => ({ ...prev, familyHistory: [...prev.familyHistory, note] }));
        }
    }

    return (
        <main ref={pageRef} className="min-h-screen p-4 sm:p-6" style={{ backgroundColor: C.bg }}>
            <div className="max-w-6xl mx-auto">
                <div className="mb-4 lg:hidden"><OnboardingLogo /></div>

                <div className="rounded-[30px] overflow-hidden border bg-white" style={{ borderColor: C.border, boxShadow: "0 18px 52px rgba(6,91,75,0.12)" }}>
                    <div className="flex min-h-[80vh]">
                        <LeftPanel fullName={fullName} />

                        <section ref={bodyRef} className="flex-1 px-5 py-7 sm:px-10 sm:py-9">
                            <div className="max-w-[760px]">
                                <button
                                    type="button"
                                    onClick={() => router.push("/patient-profile-setup")}
                                    className="inline-flex items-center gap-1 text-xs font-semibold mb-4"
                                    style={{ color: C.mid }}
                                >
                                    <ArrowLeft size={13} /> Back to personal details
                                </button>

                                <h1 className="text-[30px] sm:text-[36px] font-black leading-tight" style={{ color: C.primary }}>
                                    Add your health background
                                </h1>
                                <p className="text-sm mt-2" style={{ color: C.muted }}>
                                    This information stays private and helps improve appointment quality.
                                </p>

                                <div className="mt-6 flex flex-col gap-5">
                                    <ChipRow title="Current health issues" options={HEALTH_OPTIONS} value={draft.presentIssues} onChange={(v) => setDraft((prev) => ({ ...prev, presentIssues: v }))} />
                                    <ChipRow title="Past health issues" options={HEALTH_OPTIONS} value={draft.pastIssues} onChange={(v) => setDraft((prev) => ({ ...prev, pastIssues: v }))} />

                                    <ToggleYesNo title="Currently on medication?" value={draft.onMedication} onChange={(v) => setDraft((prev) => ({ ...prev, onMedication: v }))} />
                                    <ToggleYesNo title="Any known allergies?" value={draft.hasAllergies} onChange={(v) => setDraft((prev) => ({ ...prev, hasAllergies: v }))} />

                                    <ChipRow title="Allergy types" options={ALLERGIES} value={draft.allergyType ? [draft.allergyType] : []} onChange={(v) => setDraft((prev) => ({ ...prev, allergyType: v[0] ?? "" }))} />

                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-semibold" style={{ color: C.primary }}>Upload current prescriptions (optional)</p>
                                        <label
                                            className="w-fit px-4 py-2 rounded-full border text-xs font-semibold cursor-pointer inline-flex items-center gap-2"
                                            style={{ borderColor: C.border, backgroundColor: "#f8fffd", color: C.primary }}
                                        >
                                            <UploadCloud size={13} /> Choose file
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setDraft((prev) => ({ ...prev, fileName: e.target.files?.[0]?.name ?? "" }))}
                                            />
                                        </label>
                                        {draft.fileName && <p className="text-xs" style={{ color: C.mid }}>{draft.fileName}</p>}
                                    </div>

                                    <ChipRow title="Lifestyle habits" options={LIFESTYLE} value={draft.habitSelected} onChange={(v) => setDraft((prev) => ({ ...prev, habitSelected: v }))} />
                                    <ChipRow title="Vaccinations taken" options={VACCINES} value={draft.vaccine ? [draft.vaccine] : []} onChange={(v) => setDraft((prev) => ({ ...prev, vaccine: v[0] ?? "" }))} />

                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm font-semibold" style={{ color: C.primary }}>Family medical history</p>
                                        <div className="flex flex-wrap gap-2">
                                            {draft.familyHistory.map((f) => (
                                                <span key={f} className="px-3 py-1.5 rounded-full text-xs border" style={{ borderColor: C.border, backgroundColor: C.mint, color: C.primary }}>
                                                    {f}
                                                </span>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={addFamilyHistory}
                                                className="px-3 py-1.5 rounded-full border text-xs font-semibold inline-flex items-center gap-1"
                                                style={{ borderColor: C.border, color: C.mid }}
                                            >
                                                <Plus size={12} /> Add
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={persistAndSubmit}
                                        className="px-7 py-3 rounded-full text-white text-sm font-bold inline-flex items-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.mid})`, boxShadow: "0 10px 26px rgba(34,133,115,0.28)" }}
                                    >
                                        Complete Setup <CheckCircle2 size={15} />
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
