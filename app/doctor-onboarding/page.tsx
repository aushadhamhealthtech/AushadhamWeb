"use client";

import { useState, useRef, useEffect, type Dispatch, type SetStateAction } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { ChevronDown, Upload, Check, Shield, Star, Users, ArrowRight, ArrowLeft, UserCog, Clock } from "lucide-react";
import { OnboardingLogo } from "@/components/onboarding/logo";

/* ── Brand palette ── */
const C = {
    primary:  "#065b4b",
    mid:      "#228573",
    light:    "#3aa692",
    mint:     "#e8f5f2",
    blue:     "#658DF1",
    blueBg:   "#eef1ff",
    body:     "#3F4946",
    muted:    "rgba(6,91,75,0.5)",
    border:   "#e5e7eb",
    bg:       "#f8fffe",
};

/* ── Form state types ── */
type PersonalForm = {
    fullName:   string;
    mobile:     string;
    email:      string;
    gender:     string;
    profession: string;
};

type RegistrationForm = {
    regNumber:          string;
    stateCouncil:       string;
    regYear:            string;
    idProofType:        string;
    idProofFileName:    string;
    regCertFileName:    string;
};

const STEPS = [
    { num: 1, label: "Personal Details",     sub: "Basic information about you" },
    { num: 2, label: "Registration Details", sub: "Medical credentials & documents" },
    { num: 3, label: "You're all set!",      sub: "Verification in progress" },
];

const HEADING: Record<number, { title: string; sub: string }> = {
    1: { title: "Let's get to know you",    sub: "Start with your basic personal details." },
    2: { title: "Your medical credentials", sub: "We'll use these to verify your profile before you go live." },
    3: { title: "Application submitted!",   sub: "Sit back — our team is reviewing your credentials." },
};

const PROGRESS: Record<number, number> = { 1: 8, 2: 55, 3: 100 };

/* ── Pill text / email / tel / number input ── */
function Field({
    label, id, placeholder, type = "text", required = true, value = "", onChange,
}: {
    label: string; id: string; placeholder: string; type?: string;
    required?: boolean; value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className="onboard-input-wrap flex flex-col gap-2">
            <label htmlFor={id} className="text-sm font-semibold" style={{ color: C.primary }}>
                {label}{required && <span className="ml-0.5" style={{ color: C.mid }}>*</span>}
            </label>
            <input
                id={id} name={id} type={type} placeholder={placeholder}
                required={required} value={value} onChange={onChange}
                className="w-full px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                style={{ borderColor: C.border, color: C.primary, backgroundColor: "#fafffe" }}
                onFocus={e => { e.currentTarget.style.borderColor = C.mid;    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                onBlur={e =>  { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
            />
        </div>
    );
}

/* ── Pill select (custom animated dropdown, GSAP) ── */
function FieldSelect({
    label, id, options, placeholder = "Select", required = true,
    value: externalValue, onChange,
}: {
    label: string; id: string; options: string[]; placeholder?: string; required?: boolean;
    value?: string; onChange?: (value: string) => void;
}) {
    const [open, setOpen]           = useState(false);
    const [internalValue, setInternal] = useState("");
    const listRef  = useRef<HTMLUListElement>(null);
    const wrapRef  = useRef<HTMLDivElement>(null);
    const didMount = useRef(false);

    const value = externalValue !== undefined ? externalValue : internalValue;

    /* Animate dropdown panel on open/close */
    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        if (!didMount.current) { didMount.current = true; return; }

        if (open) {
            gsap.set(el, { display: "block" });
            gsap.fromTo(el,
                { opacity: 0, y: -10, scaleY: 0.85, transformOrigin: "top center" },
                { opacity: 1, y: 0,   scaleY: 1,    duration: 0.22, ease: "power3.out" }
            );
        } else {
            gsap.to(el, {
                opacity: 0, y: -6, scaleY: 0.88, transformOrigin: "top center",
                duration: 0.16, ease: "power2.in",
                onComplete: () => { gsap.set(el, { display: "none" }); },
            });
        }
    }, [open]);

    /* Close on outside click */
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    function choose(opt: string) {
        if (onChange) onChange(opt);
        else setInternal(opt);
        setOpen(false);
    }

    return (
        <div className="onboard-input-wrap flex flex-col gap-2" ref={wrapRef}>
            <label className="text-sm font-semibold" style={{ color: C.primary }}>
                {label}{required && <span className="ml-0.5" style={{ color: C.mid }}>*</span>}
            </label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setOpen(o => !o)}
                    className="w-full flex items-center justify-between px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                    style={{
                        borderColor:     open ? C.mid : C.border,
                        color:           value ? C.primary : C.muted,
                        backgroundColor: "#fafffe",
                        boxShadow:       open ? "0 0 0 3px rgba(34,133,115,0.12)" : "none",
                    }}
                >
                    <span>{value || placeholder}</span>
                    <ChevronDown
                        size={15}
                        style={{
                            color:      C.mid,
                            transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)",
                            transform:  open ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                    />
                </button>

                <ul
                    ref={listRef}
                    style={{
                        display:         "none",
                        position:        "absolute",
                        zIndex:          50,
                        left:            0,
                        right:           0,
                        marginTop:       "6px",
                        borderRadius:    "1rem",
                        border:          `1px solid ${C.border}`,
                        backgroundColor: "#fafffe",
                        maxHeight:       "220px",
                        overflowY:       "auto",
                        boxShadow:       "0 8px 30px rgba(6,91,75,0.12)",
                        transformOrigin: "top center",
                    }}
                >
                    {options.map(o => (
                        <li
                            key={o}
                            onMouseDown={() => choose(o)}
                            style={{
                                padding:         "10px 20px",
                                fontSize:        "0.875rem",
                                cursor:          "pointer",
                                color:           o === value ? C.primary : C.body,
                                backgroundColor: o === value ? C.mint : "transparent",
                                fontWeight:      o === value ? 600 : 400,
                                transition:      "background-color 0.1s",
                            }}
                            onMouseEnter={e => { if (o !== value) (e.currentTarget as HTMLElement).style.backgroundColor = C.mint; }}
                            onMouseLeave={e => { if (o !== value) (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                        >
                            {o}
                        </li>
                    ))}
                </ul>
            </div>
            <input type="hidden" name={id} id={id} value={value} required={required} />
        </div>
    );
}

/* ── Upload pill ── */
function UploadPill({
    label, hint, fileName, onFile,
}: {
    label: string; hint?: string; fileName?: string; onFile?: (name: string) => void;
}) {
    return (
        <div className="onboard-input-wrap flex flex-col gap-1.5">
            <span className="text-sm font-semibold" style={{ color: C.primary }}>
                {label}<span style={{ color: C.mid }}>*</span>
            </span>
            <label
                className="flex items-center gap-2.5 px-5 py-3 rounded-full border-2 border-dashed text-sm font-semibold transition-all duration-200 hover:opacity-80"
                style={{ borderColor: C.blue, color: C.blue, backgroundColor: C.blueBg }}
            >
                <Upload size={14} />
                {fileName ? fileName : "Upload File"}
                <input
                    type="file"
                    className="sr-only"
                    onChange={e => onFile?.(e.target.files?.[0]?.name ?? "")}
                />
            </label>
            {hint && !fileName && (
                <span className="text-[11px] pl-2" style={{ color: C.muted }}>{hint}</span>
            )}
        </div>
    );
}

/* ── Step 1: Personal Details ── */
function StepPersonal({
    form,
    onChange,
    onSelect,
}: {
    form: PersonalForm;
    onChange: (key: keyof PersonalForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (key: "gender" | "profession", value: string) => void;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field id="fullName" label="Full Name"     placeholder="Enter your full name"
                value={form.fullName} onChange={onChange("fullName")} />
            <Field id="mobile"   label="Mobile Number" placeholder="+91 XXXXX XXXXX" type="tel"
                value={form.mobile} onChange={onChange("mobile")} />
            <div className="sm:col-span-2">
                <Field id="email" label="Email ID" placeholder="example@gmail.com" type="email"
                    value={form.email} onChange={onChange("email")} />
            </div>
            <FieldSelect
                id="gender" label="Gender"
                options={["Male", "Female", "Other", "Prefer not to say"]}
                placeholder="Select gender"
                value={form.gender}
                onChange={(v) => onSelect("gender", v)}
            />
            <FieldSelect
                id="profession" label="Profession"
                options={["MBBS", "BAMS (Ayurveda)", "BHMS (Homeopathy)", "BDS (Dentist)", "BPT (Physiotherapy)", "MD / MS", "Other"]}
                placeholder="Select profession"
                value={form.profession}
                onChange={(v) => onSelect("profession", v)}
            />
        </div>
    );
}

/* ── Step 2: Registration Details ── */
function StepRegistration({
    form,
    onChange,
    onSelect,
    onFile,
}: {
    form: RegistrationForm;
    onChange: (key: keyof RegistrationForm) => (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (key: "stateCouncil" | "regYear" | "idProofType", value: string) => void;
    onFile: (key: "idProofFileName" | "regCertFileName", name: string) => void;
}) {
    const COUNCILS = [
        "Medical Council of India", "Delhi Medical Council", "Maharashtra Medical Council",
        "Karnataka Medical Council", "Tamil Nadu Medical Council", "Telangana Medical Council",
        "Kerala Medical Council", "Andhra Pradesh Medical Council", "Other",
    ];
    const YEARS    = Array.from({ length: 30 }, (_, i) => String(new Date().getFullYear() - i));
    const ID_PROOFS = ["Aadhar Card", "Passport", "PAN Card", "Voter ID", "Driving License"];

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {/* Medical Registration card */}
            <div className="onboard-card rounded-3xl p-5" style={{ backgroundColor: C.mint, border: "1px solid rgba(34,133,115,0.15)" }}>
                <p className="text-sm font-bold mb-4" style={{ color: C.primary }}>Medical Registration</p>
                <div className="flex flex-col gap-3.5">
                    <Field id="regNumber" label="Registration Number" placeholder="e.g. APMC/145xxx/3xxxx"
                        value={form.regNumber} onChange={onChange("regNumber")} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <FieldSelect id="stateCouncil" label="State Council" options={COUNCILS} placeholder="Select council"
                            value={form.stateCouncil} onChange={(v) => onSelect("stateCouncil", v)} />
                        <FieldSelect id="regYear" label="Year of Registration" options={YEARS} placeholder="Select year"
                            value={form.regYear} onChange={(v) => onSelect("regYear", v)} />
                    </div>
                </div>
            </div>

            {/* Documents card */}
            <div className="onboard-card rounded-3xl p-5" style={{ backgroundColor: "#fafffe", border: "1px solid rgba(34,133,115,0.12)" }}>
                <p className="text-sm font-bold mb-4" style={{ color: C.primary }}>Verification Documents</p>
                <div className="flex flex-col gap-3.5">
                    <FieldSelect id="idProofType" label="Identity Proof Type" options={ID_PROOFS} placeholder="Select document type"
                        value={form.idProofType} onChange={(v) => onSelect("idProofType", v)} />
                    <div className="grid grid-cols-1 gap-3.5">
                        <UploadPill label="Identity Proof"                   hint="e.g. my_aadhar.pdf"
                            fileName={form.idProofFileName} onFile={(n) => onFile("idProofFileName", n)} />
                        <UploadPill label="Medical Registration Certificate" hint="e.g. registration.pdf"
                            fileName={form.regCertFileName} onFile={(n) => onFile("regCertFileName", n)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Step 3: Thank You ── */
function StepThankYou() {
    const router   = useRouter();
    const checkRef = useRef<HTMLDivElement>(null);
    const cardRef  = useRef<HTMLDivElement>(null);
    const textRef  = useRef<HTMLDivElement>(null);

    /*
     * TODO(backend): replace `true` with the real verification status from your API.
     * e.g. const isVerified = doctor.verificationStatus === 'approved';
     * When false the button renders as disabled with a "pending" state.
     */
    const isVerified = true;

    useEffect(() => {
        if (checkRef.current) {
            gsap.fromTo(checkRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(2.2)" }
            );
        }
        if (textRef.current) {
            gsap.fromTo(textRef.current,
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.28 }
            );
        }
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                { y: 32, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.48 }
            );
        }
    }, []);

    return (
        <div className="flex flex-col items-center text-center gap-8 py-4">
            <div
                ref={checkRef}
                className="w-24 h-24 rounded-full flex items-center justify-center"
                style={{
                    background: `linear-gradient(135deg, ${C.primary}, ${C.light})`,
                    boxShadow: `0 16px 48px rgba(34,133,115,0.38), 0 4px 16px rgba(6,91,75,0.22)`,
                }}
            >
                <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                    <path d="M9 22L17 30L33 14" stroke="white" strokeWidth="3.5"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div ref={textRef}>
                <h2 className="text-[28px] sm:text-[34px] font-extrabold leading-tight mb-3"
                    style={{ color: C.primary }}>
                    Application submitted!<br />You&apos;re almost there.
                </h2>
                <p className="text-[15px] leading-relaxed max-w-[520px] mx-auto" style={{ color: C.body }}>
                    Our team is reviewing your credentials. Once verified, you can complete
                    your practice profile and go live on Aushadham.
                </p>
            </div>

            <div
                ref={cardRef}
                className="onboard-card w-full max-w-[500px] rounded-3xl px-8 py-8 flex flex-col items-center gap-5"
                style={{
                    backgroundColor: isVerified ? C.mint : "#f8fafc",
                    border: isVerified
                        ? `1px solid rgba(34,133,115,0.22)`
                        : `1px solid ${C.border}`,
                }}
            >
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
                    style={{
                        backgroundColor: isVerified ? "rgba(34,133,115,0.12)" : "rgba(234,179,8,0.12)",
                        color:           isVerified ? C.mid                   : "#a16207",
                    }}
                >
                    {isVerified
                        ? <><Check size={12} /> Verification approved</>
                        : <><Clock size={12} /> Verification in progress</>}
                </div>

                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                        backgroundColor: isVerified ? "rgba(6,91,75,0.12)" : "rgba(100,116,139,0.10)",
                        color:           isVerified ? C.primary             : "#64748b",
                    }}>
                    <UserCog size={28} />
                </div>

                <div>
                    <p className="text-[16px] font-bold mb-1" style={{ color: isVerified ? C.primary : C.muted }}>
                        Complete Your Practice Profile
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                        {isVerified
                            ? "Your account is verified! Set up your clinic, time slots, and public profile so patients can book appointments."
                            : "This button will be enabled once our team verifies your credentials — usually within 24 hours."}
                    </p>
                </div>

                <button
                    disabled={!isVerified}
                    onClick={() => isVerified && router.push("/doctor-profile-setup")}
                    className="flex items-center gap-2 px-10 py-3.5 rounded-full text-white font-bold text-sm transition-all duration-300"
                    style={{
                        background:  isVerified
                            ? `linear-gradient(135deg, ${C.primary}, ${C.mid})`
                            : "#cbd5e1",
                        boxShadow:   isVerified ? `0 6px 22px rgba(6,91,75,0.28)` : "none",
                        cursor:      isVerified ? "pointer" : "not-allowed",
                    }}
                    onMouseEnter={e => { if (isVerified) (e.currentTarget as HTMLElement).style.opacity = "0.9"; }}
                    onMouseLeave={e => { if (isVerified) (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                >
                    Complete Profile <ArrowRight size={15} />
                </button>
            </div>
        </div>
    );
}

/* ── Left Panel ── */
function LeftPanel({ step }: { step: number }) {
    const floatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!floatRef.current) return;
        const els = Array.from(floatRef.current.querySelectorAll<HTMLElement>(".fp-float"));
        const tweens = els.map((el, i) =>
            gsap.to(el, {
                y: i % 2 === 0 ? -10 : 9, x: i % 3 === 0 ? 5 : -4,
                duration: 3.2 + i * 0.7, repeat: -1, yoyo: true,
                ease: "sine.inOut", delay: i * 0.5,
            })
        );
        return () => tweens.forEach(t => t.kill());
    }, []);

    return (
        <div
            className="hidden lg:flex flex-col items-center justify-between px-8 py-10 shrink-0"
            style={{
                width: "300px",
                minHeight: "100vh",
                background: "linear-gradient(160deg, #065b4b 0%, #1a7a65 52%, #228573 100%)",
            }}
        >
            <OnboardingLogo variant="white" />

            {/* Vertical step tracker */}
            <div className="flex flex-col w-full my-2">
                {STEPS.map((s, i) => {
                    const isActive = s.num === step;
                    const isDone   = s.num < step;
                    return (
                        <div key={s.num}>
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center">
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-500"
                                        style={{
                                            backgroundColor: isDone   ? C.light
                                                           : isActive ? "white"
                                                           :            "rgba(255,255,255,0.18)",
                                            boxShadow: isActive ? "0 0 0 5px rgba(255,255,255,0.22)" : "none",
                                        }}
                                    >
                                        {isDone
                                            ? <Check size={16} color="white" />
                                            : <span style={{
                                                color: isActive ? C.primary : "rgba(255,255,255,0.55)",
                                                fontWeight: 700, fontSize: "14px",
                                              }}>{s.num}</span>
                                        }
                                    </div>
                                    {i < STEPS.length - 1 && (
                                        <div className="w-px my-1.5"
                                            style={{
                                                height: "44px",
                                                backgroundColor: isDone ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)",
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="pt-1.5">
                                    <p className="text-sm font-bold transition-colors duration-300"
                                        style={{ color: isActive ? "white" : isDone ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.38)" }}>
                                        {s.label}
                                    </p>
                                    <p className="text-[12px] mt-0.5 transition-colors duration-300"
                                        style={{ color: isActive ? "rgba(255,255,255,0.68)" : "rgba(255,255,255,0.28)" }}>
                                        {s.sub}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Decorative illustration */}
            <div ref={floatRef} className="w-full flex justify-center">
                <svg viewBox="0 0 220 200" fill="none" className="w-full max-w-[195px]">
                    <path d="M14 140 L50 140 L65 110 L82 170 L98 128 L114 140 L206 140"
                        stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    <path d="M76 52 C76 52 62 80 62 104 C62 126 76 136 96 136 C116 136 130 120 130 98 C130 74 116 56 116 56"
                        stroke="white" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.8" />
                    <circle cx="116" cy="49" r="11" fill="white" opacity="0.88" />
                    <circle cx="116" cy="49" r="6"  fill="#228573" />
                    <circle cx="76"  cy="52" r="5"  fill="white" opacity="0.65" />
                    <circle cx="80"  cy="38" r="5"  fill="white" opacity="0.65" />
                    <path d="M156 168 C156 168 140 161 140 178 C140 195 156 206 156 206 C156 206 172 195 172 178 C172 161 156 168 156 168Z"
                        fill="white" opacity="0.12" stroke="white" strokeWidth="1.4" />
                    <path d="M149 182 L154 188 L163 174" stroke="white" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                    <circle cx="38"  cy="60"  r="4" fill="white" opacity="0.18" className="fp-float" />
                    <circle cx="194" cy="180" r="6" fill="white" opacity="0.13" className="fp-float" />
                    <circle cx="206" cy="82"  r="3" fill="white" opacity="0.16" className="fp-float" />
                    <circle cx="26"  cy="178" r="5" fill="white" opacity="0.12" className="fp-float" />
                    <rect x="148" y="20" width="58" height="24" rx="12" fill="white" opacity="0.1" stroke="white" strokeWidth="1.3" />
                    <rect x="148" y="20" width="29" height="24" rx="12" fill="white" opacity="0.09" />
                    <line x1="177" y1="20" x2="177" y2="44" stroke="white" strokeWidth="1.1" opacity="0.35" />
                </svg>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-5">
                {([
                    { Icon: Shield, value: "100%",   label: "Secure"  },
                    { Icon: Star,   value: "4.9★",   label: "Rating"  },
                    { Icon: Users,  value: "10K+",   label: "Doctors" },
                ] as const).map(({ Icon, value, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                            <Icon size={13} color="white" />
                        </div>
                        <span className="text-white font-bold text-xs">{value}</span>
                        <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.48)" }}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── Right decorative rail ── */
function RightDecorRail({ step }: { step: number }) {
    return (
        <aside className="hidden xl:flex flex-col gap-4 w-[270px] shrink-0">
            <div
                className="rounded-3xl p-5"
                style={{
                    background: "linear-gradient(155deg, rgba(34,133,115,0.13) 0%, rgba(58,166,146,0.08) 100%)",
                    border: "1px solid rgba(34,133,115,0.16)",
                }}
            >
                <p className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: C.mid }}>
                    Profile Strength
                </p>
                <p className="text-[28px] font-extrabold mt-2" style={{ color: C.primary }}>
                    {step === 1 ? "35%" : step === 2 ? "78%" : "100%"}
                </p>
                <p className="text-xs mt-1" style={{ color: C.body }}>
                    {step === 1 ? "Add your basic info to unlock verification." : step === 2 ? "Upload docs to complete verification." : "Everything looks great and ready."}
                </p>
            </div>

            <div className="rounded-3xl p-5 bg-white" style={{ border: "1px solid rgba(34,133,115,0.12)" }}>
                <p className="text-sm font-bold mb-3" style={{ color: C.primary }}>Quick Tips</p>
                <ul className="flex flex-col gap-2.5">
                    {["Use your official registration details", "Upload clear, readable documents", "Use a reachable phone & email"].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs" style={{ color: C.body }}>
                            <span className="mt-[2px] w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(34,133,115,0.12)" }}>
                                <Check size={10} color={C.mid} />
                            </span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

/* ── Main Page ── */
export default function DoctorOnboardingPage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [showEntryWipe, setShowEntryWipe] = useState(false);

    /* ── Form state lifted to page level ── */
    const [personalForm, setPersonalForm] = useState<PersonalForm>({
        fullName: "", mobile: "", email: "", gender: "", profession: "",
    });
    const [regForm, setRegForm] = useState<RegistrationForm>({
        regNumber: "", stateCouncil: "", regYear: "",
        idProofType: "", idProofFileName: "", regCertFileName: "",
    });

    const contentRef   = useRef<HTMLDivElement>(null);
    const progressRef  = useRef<HTMLDivElement>(null);
    const rightRef     = useRef<HTMLDivElement>(null);
    const entryWipeRef = useRef<HTMLDivElement>(null);

    /* ── Helpers: update personal form ── */
    const setPersonal = (key: keyof PersonalForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setPersonalForm(prev => ({ ...prev, [key]: e.target.value }));

    const selectPersonal = (key: "gender" | "profession", value: string) =>
        setPersonalForm(prev => ({ ...prev, [key]: value }));

    /* ── Helpers: update registration form ── */
    const setReg = (key: keyof RegistrationForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) =>
            setRegForm(prev => ({ ...prev, [key]: e.target.value }));

    const selectReg = (key: "stateCouncil" | "regYear" | "idProofType", value: string) =>
        setRegForm(prev => ({ ...prev, [key]: value }));

    const setRegFile = (key: "idProofFileName" | "regCertFileName", name: string) =>
        setRegForm(prev => ({ ...prev, [key]: name }));

    /* ── Entry wipe animation ── */
    useEffect(() => {
        const shouldWipe = sessionStorage.getItem("aushadham:onboarding-entry-wipe") === "1";
        if (!shouldWipe) return;
        sessionStorage.removeItem("aushadham:onboarding-entry-wipe");
        setShowEntryWipe(true);
    }, []);

    useEffect(() => {
        if (!showEntryWipe || !entryWipeRef.current) return;
        gsap.set(entryWipeRef.current, { xPercent: 0, opacity: 1 });
        gsap.to(entryWipeRef.current, {
            xPercent: 100, opacity: 0.98, duration: 0.38, ease: "power3.inOut",
            onComplete: () => setShowEntryWipe(false),
        });
    }, [showEntryWipe]);

    useEffect(() => {
        if (rightRef.current) {
            gsap.fromTo(rightRef.current,
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.28, ease: "power2.out" }
            );
        }
    }, []);

    /* ── Step transition animation ── */
    useEffect(() => {
        const root = contentRef.current;
        if (!root) return;
        const fieldNodes = root.querySelectorAll(".onboard-input-wrap, .onboard-card");
        gsap.killTweensOf(root);
        gsap.killTweensOf(fieldNodes);
        gsap.set([root, ...Array.from(fieldNodes)], {
            opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform",
        });
        const tween = gsap.fromTo(root,
            { y: 6, opacity: 0.92 },
            { y: 0, opacity: 1, duration: 0.2, ease: "power1.out", overwrite: true }
        );
        return () => { tween.kill(); };
    }, [step]);

    function goToStep(next: 1 | 2 | 3) {
        const el  = contentRef.current;
        const dir = next > step ? 1 : -1;

        if (progressRef.current) {
            gsap.to(progressRef.current, { width: `${PROGRESS[next]}%`, duration: 0.55, ease: "power2.out" });
        }

        if (next === 3) {
            /*
             * TODO(backend): submit the collected form data to your onboarding API here.
             *
             * Example payload:
             *   const payload = {
             *     personal:      personalForm,   // { fullName, mobile, email, gender, profession }
             *     registration:  regForm,        // { regNumber, stateCouncil, regYear, idProofType }
             *     // file uploads should be sent as FormData, not JSON
             *   };
             *   await fetch('/api/doctors/onboard', { method: 'POST', body: JSON.stringify(payload) });
             *
             * For file uploads use multipart/form-data:
             *   const fd = new FormData();
             *   fd.append('idProof', idProofFile);
             *   fd.append('regCert', regCertFile);
             *   await fetch('/api/doctors/onboard/documents', { method: 'POST', body: fd });
             */
        }

        if (!el) { setStep(next); return; }

        gsap.to(el, {
            x: -52 * dir, opacity: 0, duration: 0.22, ease: "power2.in",
            onComplete() {
                setStep(next);
                gsap.set(el, { x: 52 * dir });
                gsap.to(el, { x: 0, opacity: 1, duration: 0.36, ease: "power3.out" });
            },
        });
    }

    function goBack() {
        if (step > 1) { goToStep((step - 1) as 1 | 2 | 3); return; }
        if (window.history.length > 1) window.history.back();
    }

    const isFinal = step === 3;

    return (
        <div className="relative flex min-h-screen overflow-hidden" style={{ backgroundColor: C.bg }}>

            {showEntryWipe && (
                <div
                    ref={entryWipeRef}
                    className="pointer-events-none absolute inset-0 z-[90]"
                    style={{ background: "linear-gradient(112deg, #065b4b 0%, #228573 58%, #3aa692 100%)" }}
                />
            )}

            <LeftPanel step={step} />

            <div className="flex-1 flex flex-col overflow-y-auto" ref={rightRef}>

                {/* Mobile top bar */}
                <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
                    <OnboardingLogo />
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full"
                        style={{ backgroundColor: C.mint, color: C.primary }}>
                        Step {step} of 3
                    </span>
                </header>

                {/* Form body */}
                <div className="relative flex-1 flex items-start justify-center px-6 sm:px-10 py-7 lg:py-8 overflow-hidden">
                    <div className="pointer-events-none absolute -top-12 -right-16 w-52 h-52 rounded-full" style={{ background: "radial-gradient(circle, rgba(58,166,146,0.16) 0%, rgba(58,166,146,0) 72%)" }} />
                    <div className="pointer-events-none absolute bottom-0 -left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(101,141,241,0.14) 0%, rgba(101,141,241,0) 74%)" }} />

                    <div className="w-full max-w-[980px] relative z-10 flex gap-8 items-start">
                        <div className="flex-1 min-w-0">

                            {/* Heading */}
                            <div className="onboard-heading mb-6">
                                <h1 className="text-[26px] sm:text-[30px] font-extrabold leading-tight mb-1.5"
                                    style={{ color: C.primary, letterSpacing: "-0.3px" }}>
                                    {HEADING[step].title}
                                </h1>
                                <p className="text-sm" style={{ color: C.body }}>
                                    {HEADING[step].sub}
                                </p>
                            </div>

                            {/* Progress bar */}
                            {!isFinal && (
                                <div className="onboard-progress mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold" style={{ color: C.mid }}>
                                            Step {step} of 2
                                        </span>
                                        <span className="text-xs" style={{ color: "rgba(6,91,75,0.45)" }}>
                                            {PROGRESS[step]}% complete
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.border }}>
                                        <div
                                            ref={progressRef}
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${PROGRESS[step]}%`,
                                                background: `linear-gradient(90deg, ${C.primary}, ${C.light})`,
                                                boxShadow: "0 0 8px rgba(58,166,146,0.4)",
                                                transition: "none",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Animated step content */}
                            <div ref={contentRef} className="onboard-content min-h-[460px]">
                                {step === 1 && (
                                    <StepPersonal
                                        form={personalForm}
                                        onChange={setPersonal}
                                        onSelect={selectPersonal}
                                    />
                                )}
                                {step === 2 && (
                                    <StepRegistration
                                        form={regForm}
                                        onChange={setReg}
                                        onSelect={selectReg}
                                        onFile={setRegFile}
                                    />
                                )}
                                {step === 3 && <StepThankYou />}
                            </div>

                            {/* CTA */}
                            {!isFinal && (
                                <div className="onboard-cta mt-7 flex items-center justify-between gap-3">
                                    <button
                                        onClick={goBack}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-85"
                                        style={{
                                            backgroundColor: "rgba(34,133,115,0.1)",
                                            color: C.primary,
                                            border: "1px solid rgba(34,133,115,0.18)",
                                        }}
                                    >
                                        <ArrowLeft size={15} />
                                        Back
                                    </button>
                                    <button
                                        onClick={() => goToStep((step + 1) as 1 | 2 | 3)}
                                        className="flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[rgba(34,133,115,0.28)] hover:-translate-y-0.5"
                                        style={{
                                            background: `linear-gradient(135deg, ${C.primary}, ${C.mid})`,
                                            boxShadow: `0 4px 18px rgba(6,91,75,0.22)`,
                                        }}
                                    >
                                        Save &amp; Continue
                                        <ArrowRight size={15} />
                                    </button>
                                </div>
                            )}

                        </div>
                        <RightDecorRail step={step} />
                    </div>
                </div>
            </div>
        </div>
    );
}
