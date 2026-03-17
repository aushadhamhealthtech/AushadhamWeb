"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import {
    Check, ArrowLeft, ArrowRight,
    Building2, Clock, Stethoscope, Upload, Star, Shield, Info, Plus, UserPlus, X,
} from "lucide-react";
import { OnboardingLogo } from "@/components/onboarding/logo";
import { PillInput, PillSelect, PillMultiSelect } from "@/components/onboarding/primitives";

/* ── Brand palette ── */
const C = {
    primary: "#065b4b",
    mid:     "#228573",
    light:   "#3aa692",
    mint:    "#e8f5f2",
    blue:    "#658DF1",
    blueBg:  "#eef1ff",
    body:    "#3F4946",
    muted:   "rgba(6,91,75,0.5)",
    border:  "#e5e7eb",
    bg:      "#f8fffe",
};

const PROFILE_STEPS = [
    { num: 1, label: "Clinic details",   sub: "Your clinic name & address"        },
    { num: 2, label: "Practice details", sub: "Specialization & experience"        },
    { num: 3, label: "Time slots",       sub: "Appointment availability"           },
    { num: 4, label: "Profile details",  sub: "Photo, bio & finishing touches"     },
];

const INDIAN_STATES = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
    "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
    "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
    "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
    "Delhi","Jammu and Kashmir","Ladakh","Puducherry","Chandigarh",
];

const SPECIALIZATIONS = [
    "General Physician","Cardiologist","Dermatologist","Neurologist",
    "Orthopedician","Pediatrician","Psychiatrist","Gynecologist",
    "Ophthalmologist","ENT Specialist","Dentist","Physiotherapist",
    "Diabetologist","Gastroenterologist","Other",
];

const LANGUAGES = [
    "English","Hindi","Tamil","Telugu","Kannada","Malayalam",
    "Marathi","Bengali","Gujarati","Punjabi","Odia","Other",
];

const PRACTICE_TYPES = ["Clinic", "Hospital", "Teleconsultation", "Home Visit"];
const APPOINTMENT_MODES = ["In-Person", "Video Consultation", "Chat Consultation", "All of the above"];
const ILLNESS_TAGS = [
    "Diabetes","Hypertension","Fever","Asthma","Thyroid","Migraine",
    "Skin Allergy","Back Pain","PCOS","Arthritis",
];

const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DURATIONS = ["10 min","15 min","20 min","30 min","45 min","60 min"];
const TIME_GAPS = ["0 min", "5 min", "10 min", "15 min", "20 min"];


/* ── Horizontal stepper ── */
function HorizontalStepper({ step }: { step: number }) {
    return (
        <div className="w-full relative pt-1">
            <div
                className="absolute left-[6%] right-[6%] h-0.5 top-[18px]"
                style={{ backgroundColor: C.border }}
            />
            <div
                className="absolute left-[6%] h-0.5 top-[18px] transition-all duration-500"
                style={{
                    backgroundColor: C.mid,
                    width: `calc(88% * ${(step - 1) / (PROFILE_STEPS.length - 1)})`,
                }}
            />

            <div className="grid grid-cols-4 relative">
                {PROFILE_STEPS.map((s, i) => {
                    const isActive = s.num === step;
                    const isDone   = s.num < step;
                    return (
                        <div key={s.num} className="flex flex-col items-center">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                                style={{
                                    backgroundColor: isDone ? C.mid : isActive ? C.primary : "#e6ebe9",
                                    border: (isDone || isActive) ? "none" : `2px solid ${C.border}`,
                                    boxShadow: isActive ? "0 0 0 3px rgba(6,91,75,0.12)" : "none",
                                }}
                            >
                                {isDone
                                    ? <Check size={15} color="white" strokeWidth={2.5} />
                                    : <span style={{ color: isActive ? "white" : C.muted, fontWeight: 700, fontSize: "13px" }}>{s.num}</span>
                                }
                            </div>
                            <div className="mt-2 text-center px-1">
                                <p className="text-xs font-bold leading-tight transition-colors duration-300"
                                    style={{ color: isActive ? C.primary : isDone ? C.mid : C.muted }}>
                                    {s.label}
                                </p>
                                <p className="text-[10px] leading-tight mt-0.5 hidden xl:block"
                                    style={{ color: "rgba(6,91,75,0.38)" }}>
                                    {s.sub}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ── Context card (right sidebar, changes per step) ── */
const STEP_CTX = {
    1: {
        icon: <Building2 size={28} />,
        title: "Tell us about your Clinic",
        body:  "Let's start with the basics. Provide your clinic name and full address so patients can find you easily.",
        tip:   "Accurate clinic details build trust and improve discoverability on search.",
    },
    2: {
        icon: <Stethoscope size={28} />,
        title: "Tell us about your practice",
        body:  "These details help personalize patient search. Add practice, specialty and consultation mode.",
        tip:   "More complete profiles rank better in patient discovery.",
    },
    3: {
        icon: <Clock size={28} />,
        title: "Set Your Availability",
        body:  "Set weekly slots, consultation duration, and buffer time between appointments.",
        tip:   "Use realistic buffers to avoid delays and improve patient experience.",
    },
    4: {
        icon: <UserPlus size={28} />,
        title: "Add your profile picture",
        body:  "A clear and professional profile photo helps patients identify and trust you quickly.",
        tip:   "Use a well-lit, front-facing photo for best results.",
    },
} as const;

function ContextCard({ step }: { step: number }) {
    const ctx = STEP_CTX[step as keyof typeof STEP_CTX];
    return (
        <div className="rounded-3xl p-6 flex flex-col gap-5 sticky top-6"
            style={{
                background: `linear-gradient(145deg, ${C.mint} 0%, rgba(232,245,242,0.5) 100%)`,
                border:     `1px solid rgba(34,133,115,0.18)`,
                boxShadow:  "5px 5px 28px rgba(0,107,91,0.10)",
            }}
        >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(6,91,75,0.10)", color: C.primary }}>
                {ctx.icon}
            </div>
            <div>
                <h3 className="text-[17px] font-extrabold mb-2 leading-snug" style={{ color: C.primary }}>
                    {ctx.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.body }}>
                    {ctx.body}
                </p>
            </div>
            <div className="rounded-2xl px-4 py-3 text-xs leading-relaxed font-medium"
                style={{ backgroundColor: "rgba(34,133,115,0.10)", color: C.mid }}>
                💡 {ctx.tip}
            </div>
        </div>
    );
}

/* ── Step 1: Clinic Details ── */
function StepClinicDetails() {
    const [form, setForm] = useState({
        clinicName: "", doorNo: "", street: "", city: "", state: "", zip: "", fee: "",
    });
    const [pinInfo, setPinInfo] = useState<string>("");
    const set = (k: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

    useEffect(() => {
        const zip = form.zip.trim();
        if (zip.length !== 6 || !/^\d{6}$/.test(zip)) {
            setPinInfo("");
            return;
        }

        const ctrl = new AbortController();
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${zip}`, { signal: ctrl.signal });
                const data = await res.json();
                const postOffice = data?.[0]?.PostOffice?.[0];
                if (postOffice) {
                    setForm(prev => ({
                        ...prev,
                        city: postOffice.District || prev.city,
                        state: postOffice.State || prev.state,
                    }));
                    setPinInfo(`Auto-filled: ${postOffice.District}, ${postOffice.State}`);
                } else {
                    setPinInfo("Pincode not found. You can enter city/state manually.");
                }
            } catch {
                if (!ctrl.signal.aborted) setPinInfo("Could not auto-fetch location right now.");
            }
        }, 280);

        return () => {
            ctrl.abort();
            clearTimeout(timer);
        };
    }, [form.zip]);

    return (
        <div className="flex flex-col gap-5">
            <PillInput
                id="clinicName" label="Hospital / Clinic Name"
                placeholder="e.g. Aushadham Wellness Clinic"
                value={form.clinicName} onChange={set("clinicName")}
            />

            {/* Address group */}
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: C.primary }}>
                    Hospital / Clinic Address<span className="ml-0.5" style={{ color: C.mid }}>*</span>
                </span>
                <div className="flex flex-col gap-3 pl-0">
                    <PillInput id="doorNo" placeholder="Door No. / Flat name"
                        required={false} value={form.doorNo} onChange={set("doorNo")} />
                    <PillInput id="street" placeholder="Street Name"
                        required={false} value={form.street} onChange={set("street")} />
                    <PillSelect
                        id="state"
                        label=""
                        options={INDIAN_STATES}
                        placeholder="State"
                        required={false}
                        value={form.state}
                        onChange={(state) => setForm(f => ({ ...f, state }))}
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <PillInput id="city" placeholder="City"
                            required={false} value={form.city} onChange={set("city")} />
                        <PillInput id="zip" placeholder="Zip Code" type="tel"
                            required={false} value={form.zip} onChange={set("zip")} />
                    </div>
                    {pinInfo && (
                        <p className="text-xs" style={{ color: pinInfo.startsWith("Auto-filled") ? C.mid : C.muted }}>
                            {pinInfo}
                        </p>
                    )}
                </div>
            </div>

            {/* Consultation fees */}
            <div className="ps-field flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: C.primary }}>
                    Consultation Fees<span className="ml-0.5" style={{ color: C.mid }}>*</span>
                </label>
                <div className="flex gap-2 items-stretch">
                    <span className="flex items-center px-5 rounded-full border text-sm font-bold shrink-0"
                        style={{ borderColor: C.border, color: C.primary, backgroundColor: C.mint }}>
                        ₹
                    </span>
                    <input
                        id="fee" name="fee" type="number" placeholder="e.g. 400" min="0"
                        value={form.fee}
                        onChange={e => setForm(f => ({ ...f, fee: e.target.value }))}
                        className="flex-1 px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                        style={{ borderColor: C.border, color: C.primary, backgroundColor: "#fafffe" }}
                        onFocus={e => { e.currentTarget.style.borderColor = C.mid; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                        onBlur={e  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
                    />
                </div>
                <p className="text-xs" style={{ color: C.muted }}>
                    This amount is shown to patients during appointment booking.
                </p>
            </div>
        </div>
    );
}

/* ── Step 2: Practice Details ── */
function StepPracticeDetails() {
    const [experience, setExperience] = useState("");
    const [illnessInput, setIllnessInput] = useState("");
    const [illnessTags, setIllnessTags] = useState<string[]>([]);

    function addTag(raw: string) {
        const tag = raw.trim();
        if (!tag) return;
        if (illnessTags.includes(tag)) return;
        setIllnessTags(prev => [...prev, tag].slice(0, 8));
    }

    return (
        <div className="flex flex-col gap-3.5">
            <PillSelect
                id="practice" label="Practice"
                options={PRACTICE_TYPES} placeholder="Select"
            />
            <PillSelect
                id="specialization" label="Specialty"
                options={SPECIALIZATIONS} placeholder="Select"
            />

            <div className="ps-field flex flex-col gap-1.5">
                <label htmlFor="illnessTags" className="text-sm font-semibold" style={{ color: C.primary }}>
                    Add type of illness for your specialty<span className="ml-0.5" style={{ color: C.mid }}>*</span>
                    <Info size={12} className="inline-block ml-1 mb-0.5" style={{ color: C.muted }} />
                </label>
                <input
                    id="illnessTags"
                    name="illnessTags"
                    placeholder="Enter texts to add Tags"
                    value={illnessInput}
                    onChange={(e) => setIllnessInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addTag(illnessInput);
                            setIllnessInput("");
                        }
                    }}
                    className="w-full px-5 py-3.5 rounded-full border text-sm outline-none transition-all duration-200"
                    style={{ borderColor: C.border, color: C.primary, backgroundColor: "#fafffe" }}
                    onFocus={e => { e.currentTarget.style.borderColor = C.mid; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(34,133,115,0.12)"; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.boxShadow = "none"; }}
                />

                <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {illnessTags.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => setIllnessTags(prev => prev.filter(t => t !== tag))}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: C.mint, color: C.primary }}
                        >
                            {tag} ×
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-0.5">
                    {ILLNESS_TAGS.filter(t => !illnessTags.includes(t)).slice(0, 6).map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => addTag(tag)}
                            className="px-2.5 py-1 rounded-full text-[11px] border"
                            style={{ borderColor: C.border, color: C.muted, backgroundColor: "#fff" }}
                        >
                            + {tag}
                        </button>
                    ))}
                </div>
            </div>

            <PillSelect
                id="mode" label="Mode of Appointment"
                options={APPOINTMENT_MODES} placeholder="Select"
            />
            <PillMultiSelect
                id="language" label="Languages"
                options={LANGUAGES} placeholder="Select all the languages you know"
            />
            <PillInput
                id="experience" label="Experience"
                placeholder="Enter no. of years" type="number"
                value={experience}
                onChange={e => setExperience(e.target.value)}
            />
        </div>
    );
}

/* ── Step 3: Time Slots ── */
function StepTimeSlots() {
    const [selectedDay, setSelectedDay] = useState<string>("Mon");
    const [copyTargets, setCopyTargets] = useState<string[]>([]);
    const [daySchedules, setDaySchedules] = useState<Record<string, { enabled: boolean; ranges: Array<{ start: string; end: string }> }>>(() => {
        return Object.fromEntries(
            DAYS.map((d) => [
                d,
                {
                    enabled: false,
                    ranges: [],
                },
            ])
        );
    });

    const current = daySchedules[selectedDay];

    useEffect(() => {
        setCopyTargets([]);
    }, [selectedDay]);

    function toggleDay(day: string) {
        setDaySchedules((prev) => {
            const nextEnabled = !prev[day].enabled;
            return {
                ...prev,
                [day]: {
                    enabled: nextEnabled,
                    ranges: nextEnabled && prev[day].ranges.length === 0
                        ? [{ start: "08:00 AM", end: "10:00 AM" }]
                        : prev[day].ranges,
                },
            };
        });
    }

    function updateRange(index: number, key: "start" | "end", value: string) {
        setDaySchedules((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                ranges: prev[selectedDay].ranges.map((r, i) => (i === index ? { ...r, [key]: value } : r)),
            },
        }));
    }

    function addRange() {
        setDaySchedules((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                ranges: [...prev[selectedDay].ranges, { start: "02:00 PM", end: "04:00 PM" }],
            },
        }));
    }

    function removeRange(index: number) {
        setDaySchedules((prev) => ({
            ...prev,
            [selectedDay]: {
                ...prev[selectedDay],
                ranges: prev[selectedDay].ranges.filter((_, i) => i !== index),
            },
        }));
    }

    function toggleCopyTarget(day: string) {
        if (day === selectedDay) return;
        setCopyTargets((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    }

    function applyCopyToTargets() {
        if (!current.enabled || current.ranges.length === 0 || copyTargets.length === 0) return;
        setDaySchedules((prev) => {
            const next = { ...prev };
            copyTargets.forEach((day) => {
                next[day] = {
                    enabled: true,
                    ranges: current.ranges.map((r) => ({ ...r })),
                };
            });
            return next;
        });
        setCopyTargets([]);
    }

    return (
        <div className="rounded-3xl px-5 py-5 flex flex-col gap-4.5"
            style={{ border: `1px solid ${C.border}`, backgroundColor: "rgba(255,255,255,0.78)" }}>
            <div className="ps-field flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: C.primary }}>Select Days</span>
                <div className="flex flex-wrap gap-2">
                    {DAYS.map(d => {
                        const active = daySchedules[d].enabled;
                        const selected = selectedDay === d;
                        return (
                            <div key={d} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setSelectedDay(d)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200"
                                    style={{
                                        backgroundColor: active ? C.mid : "#ecefee",
                                        color:           active ? "white" : "#17315f",
                                        borderColor:     selected ? C.primary : active ? C.mid : "#ecefee",
                                        boxShadow:       selected ? "0 0 0 2px rgba(6,91,75,0.18)" : "none",
                                        opacity:         active ? 1 : 0.85,
                                    }}
                                >
                                    {d}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => toggleDay(d)}
                                    className="absolute -top-1.5 -right-1.5 w-[18px] h-[18px] rounded-full text-[10px] font-bold"
                                    style={{
                                        backgroundColor: active ? "#16a34a" : "#9ca3af",
                                        color: "white",
                                    }}
                                    title={active ? "Disable day" : "Enable day"}
                                >
                                    {active ? "✓" : "+"}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <p className="text-[11px]" style={{ color: C.muted }}>
                    No day is pre-selected. Enable only the days you actually consult.
                </p>
            </div>

            <div className="ps-field flex flex-col gap-2">
                <span className="text-sm font-semibold" style={{ color: C.primary }}>
                    Select time range for {selectedDay} <Info size={12} className="inline-block ml-1 mb-0.5" style={{ color: C.mid }} />
                </span>
                {!current.enabled ? (
                    <div className="rounded-2xl px-4 py-3 text-sm" style={{ backgroundColor: "#f1f5f9", color: C.muted }}>
                        {selectedDay} is currently disabled. Enable it from the day selector to add timings.
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {current.ranges.map((r, idx) => (
                            <div key={`${r.start}-${r.end}-${idx}`} className="flex flex-wrap gap-2 items-center">
                                <div className="min-w-[170px] flex-1">
                                    <PillSelect id={`${selectedDay}-start-${idx}`} label="" options={["06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM","12:00 PM"]}
                                        placeholder="Start" required={false} value={r.start}
                                        onChange={(start) => updateRange(idx, "start", start)} />
                                </div>
                                <div className="min-w-[170px] flex-1">
                                    <PillSelect id={`${selectedDay}-end-${idx}`} label="" options={["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM"]}
                                        placeholder="End" required={false} value={r.end}
                                        onChange={(end) => updateRange(idx, "end", end)} />
                                </div>
                                {current.ranges.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeRange(idx)}
                                        className="w-9 h-9 rounded-full flex items-center justify-center border"
                                        style={{ borderColor: C.border, color: C.muted, backgroundColor: "white" }}
                                        aria-label="Remove time range"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addRange}
                            className="w-11 h-11 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#a0f2de", color: C.primary }}
                            aria-label="Add time range"
                        >
                            <Plus size={18} />
                        </button>

                        <div className="mt-2 rounded-2xl px-4 py-3" style={{ backgroundColor: "#f8fffe", border: `1px solid ${C.border}` }}>
                            <div className="flex items-center justify-between gap-2 mb-2">
                                <p className="text-xs font-semibold" style={{ color: C.primary }}>
                                    Copy {selectedDay} timings to other days
                                </p>
                                <button
                                    type="button"
                                    onClick={applyCopyToTargets}
                                    disabled={copyTargets.length === 0 || current.ranges.length === 0}
                                    className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{
                                        background: `linear-gradient(135deg, ${C.primary}, ${C.mid})`,
                                        boxShadow: "0 3px 10px rgba(6,91,75,0.2)",
                                    }}
                                >
                                    Apply Copy
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {DAYS.filter((d) => d !== selectedDay).map((d) => {
                                    const selected = copyTargets.includes(d);
                                    return (
                                        <button
                                            key={d}
                                            type="button"
                                            onClick={() => toggleCopyTarget(d)}
                                            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150"
                                            style={{
                                                backgroundColor: selected ? C.mint : "white",
                                                color: selected ? C.primary : C.muted,
                                                borderColor: selected ? C.mid : C.border,
                                            }}
                                        >
                                            {d}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-[11px] mt-1.5" style={{ color: C.muted }}>
                                Copied timings can still be edited independently per day.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <PillSelect id="slotDuration" label="Select Duration"
                    options={DURATIONS} placeholder="15 Mins" />
                <PillSelect id="timeGap" label="Select Time Gap"
                    options={TIME_GAPS} placeholder="5 Mins" />
            </div>
        </div>
    );
}

/* ── Step 4: Profile Details ── */
function StepProfileDetails() {
    const [photoName, setPhotoName] = useState<string | null>(null);

    return (
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between min-h-[280px]">
            <div className="flex flex-col gap-3">
                <div className="w-[170px] h-[158px] rounded-3xl border flex items-center justify-center"
                    style={{ borderColor: C.border, backgroundColor: "#f2f5f4", color: "#a8aeab" }}>
                    <UserPlus size={86} strokeWidth={1.5} />
                </div>

                <label
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-sm font-bold cursor-pointer transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                    style={{
                        background: `linear-gradient(135deg, ${C.primary} 0%, ${C.mid} 100%)`,
                        boxShadow: "0 4px 18px rgba(34,133,115,0.28)",
                    }}
                >
                    <Upload size={15} /> Upload your picture
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => setPhotoName(e.target.files?.[0]?.name ?? null)}
                    />
                </label>

                <p className="text-xs max-w-[230px]" style={{ color: C.muted }}>
                    Make sure your image is clear and clearly recognized.
                </p>
                {photoName && (
                    <p className="text-xs font-semibold" style={{ color: C.mid }}>Selected: {photoName}</p>
                )}
            </div>

            <div className="rounded-3xl px-5 py-5 max-w-[360px]"
                style={{
                    background: `linear-gradient(145deg, ${C.mint} 0%, rgba(232,245,242,0.5) 100%)`,
                    border:     `1px solid rgba(34,133,115,0.18)`,
                    boxShadow:  "5px 5px 25px rgba(0,107,91,0.14)",
                }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: "rgba(6,91,75,0.10)", color: C.primary }}>
                    <Stethoscope size={24} />
                </div>
                <h3 className="text-[19px] font-extrabold mb-1.5" style={{ color: C.primary }}>
                    Add your profile picture
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: C.body }}>
                    Please add your recent profile picture so patients can identify you,
                    and it helps in building trust.
                </p>
            </div>
        </div>
    );
}

/* ── Left Panel ── */
function LeftPanel({ step }: { step: number }) {
    const floatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!floatRef.current) return;
        const els = Array.from(floatRef.current.querySelectorAll<HTMLElement>(".ps-float"));
        const tweens = els.map((el, i) =>
            gsap.to(el, {
                y: i % 2 === 0 ? -9 : 9, x: i % 3 === 0 ? 5 : -4,
                duration: 3.0 + i * 0.65, repeat: -1, yoyo: true,
                ease: "sine.inOut", delay: i * 0.4,
            })
        );
        return () => tweens.forEach(t => t.kill());
    }, []);

    const pct = Math.round((step / PROFILE_STEPS.length) * 100);

    return (
        <div className="hidden lg:flex flex-col items-center justify-between px-8 py-10 shrink-0 relative"
            style={{
                width: "300px",
                minHeight: "100vh",
                background: "linear-gradient(160deg, #032f27 0%, #065b4b 45%, #228573 100%)",
            }}
        >
            {/* Ambient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-r-none">
                <div className="absolute top-[-60px] left-[-40px] w-[220px] h-[220px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(58,166,146,0.15), transparent 70%)" }} />
                <div className="absolute bottom-[-40px] right-[-20px] w-[180px] h-[180px] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(34,133,115,0.12), transparent 70%)" }} />
            </div>

            <OnboardingLogo variant="white" />

            {/* Illustration */}
            <div ref={floatRef} className="w-full flex justify-center">
                <svg viewBox="0 0 220 240" fill="none" className="w-full max-w-[190px]">
                    <circle cx="110" cy="120" r="100" fill="white" opacity="0.04" />
                    <circle cx="110" cy="120" r="70"  fill="white" opacity="0.04" />
                    {/* Pulse line */}
                    <path d="M18 145 L48 145 L62 119 L78 172 L92 133 L106 145 L202 145"
                        stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    {/* Clipboard */}
                    <rect x="60" y="38" width="100" height="118" rx="10"
                        fill="white" opacity="0.09" stroke="white" strokeWidth="1.4" />
                    <rect x="80" y="28" width="60" height="22" rx="6" fill="white" opacity="0.13" />
                    <path d="M74 68 h72 M74 82 h56 M74 96 h64 M74 110 h42 M74 124 h58"
                        stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.42" />
                    <text x="65" y="66" fontSize="8" fill="white" opacity="0.8"
                        fontFamily="Inter,sans-serif" fontWeight="700">Rx</text>
                    {/* Mini stethoscope */}
                    <path d="M138 158 C138 158 128 172 128 182 C128 191 134 195 141 195 C148 195 154 189 154 180 C154 169 147 161 147 161"
                        stroke="white" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.65" />
                    <circle cx="147" cy="155" r="7" fill="white" opacity="0.8" />
                    <circle cx="147" cy="155" r="4" fill="#228573" />
                    {/* Sparkle */}
                    <path d="M168 44 L170 38 L172 44 L178 46 L172 48 L170 54 L168 48 L162 46 Z"
                        fill="white" opacity="0.35" />
                    {/* Pill capsule */}
                    <rect x="148" y="20" width="52" height="20" rx="10"
                        fill="white" opacity="0.10" stroke="white" strokeWidth="1.2" />
                    <rect x="148" y="20" width="26" height="20" rx="10" fill="white" opacity="0.08" />
                    <line x1="174" y1="20" x2="174" y2="40" stroke="white" strokeWidth="1" opacity="0.35" />
                    {/* Floating dots */}
                    <circle cx="34"  cy="192" r="4" fill="white" opacity="0.18" className="ps-float" />
                    <circle cx="188" cy="204" r="5" fill="white" opacity="0.14" className="ps-float" />
                    <circle cx="204" cy="86"  r="3" fill="white" opacity="0.16" className="ps-float" />
                    <circle cx="22"  cy="94"  r="4" fill="white" opacity="0.12" className="ps-float" />
                </svg>
            </div>

            {/* Profile completion + trust badges */}
            <div className="w-full space-y-4">
                {/* Progress bar */}
                <div className="rounded-2xl px-5 py-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.14)" }}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-white opacity-80">Profile Setup</span>
                        <span className="text-xs font-bold" style={{ color: "#a0f2de" }}>{pct}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.14)" }}>
                        <div className="h-1.5 rounded-full transition-all duration-700"
                            style={{
                                width: `${pct}%`,
                                background: "linear-gradient(90deg, #a0f2de, #3aa692)",
                            }} />
                    </div>
                    <p className="text-[11px] mt-2 opacity-50 text-white">Step {step} of {PROFILE_STEPS.length}</p>
                </div>

                {/* Trust badges */}
                <div className="flex flex-col gap-2">
                    {[
                        { icon: <Shield size={11} />, text: "ABDM-compliant verification" },
                        { icon: <Star size={11} />,   text: "Listed on Aushadham network"  },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-white opacity-50">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}>
                                {item.icon}
                            </div>
                            {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Page ── */
export default function DoctorProfileSetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [stepDir, setStepDir] = useState(1);
    const contentRef  = useRef<HTMLDivElement>(null);
    const headerRef   = useRef<HTMLDivElement>(null);
    const formCardRef = useRef<HTMLDivElement>(null);

    /* Initial fade-in */
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" });
    }, []);

    /* Step entry animation */
    useEffect(() => {
        const root = contentRef.current;
        if (!root) return;
        gsap.killTweensOf(root);
        gsap.set(root, { opacity: 1, x: 0, y: 0 });
        const tween = gsap.fromTo(root,
            { x: 16 * stepDir, y: 6, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.34, ease: "power3.out", overwrite: true }
        );
        return () => { tween.kill(); };
    }, [step, stepDir]);

    useEffect(() => {
        const card = formCardRef.current;
        if (!card) return;
        gsap.killTweensOf(card);
        const tween = gsap.fromTo(
            card,
            { opacity: 0.92 },
            { opacity: 1, duration: 0.28, ease: "power2.out", overwrite: true }
        );
        return () => {
            tween.kill();
        };
    }, [step]);

    const formCardBackgroundByStep: Record<number, string> = {
        1: "#ffffff",
        2: "#ffffff",
        3: "rgba(255,255,255,0.90)",
        4: "#ffffff",
    };

    function goToStep(n: number) {
        const root = contentRef.current;
        if (!root) { setStep(n); return; }
        const dir = n > step ? 1 : -1;
        setStepDir(dir);
        gsap.to(root, {
            x: -28 * dir, opacity: 0, duration: 0.24, ease: "power2.inOut",
            onComplete: () => setStep(n),
        });
    }

    return (
        <div className="flex min-h-screen" style={{ backgroundColor: C.bg }}>

            {/* Ambient blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                <div className="absolute top-[-60px] right-0 w-[380px] h-[380px] rounded-full"
                    style={{ background: `radial-gradient(circle, rgba(58,166,146,0.07), transparent 70%)` }} />
                <div className="absolute bottom-0 left-[35%] w-[280px] h-[280px] rounded-full"
                    style={{ background: `radial-gradient(circle, rgba(34,133,115,0.05), transparent 70%)` }} />
            </div>

            <LeftPanel step={step} />

            {/* Right: main content column */}
            <div className="flex-1 min-h-screen flex flex-col relative" style={{ zIndex: 1 }}>

                <div className="flex-1 px-5 pt-4 pb-4 lg:px-6 lg:pt-5 lg:pb-4">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex justify-center mb-6">
                        <OnboardingLogo variant="teal" />
                    </div>

                    {/* Dynamic header (kept compact to minimize scrolling) */}
                    <div ref={headerRef} className="max-w-4xl mx-auto mb-3.5">
                        {step === 1 && (
                            <div className="text-center">
                                <h1 className="text-[28px] sm:text-[34px] font-extrabold mb-1.5 leading-tight" style={{ color: C.body }}>
                                    {/* TODO(backend): replace with doctor's name from session/auth context */}
                                    Welcome, <span style={{ color: C.primary }}>Doctor</span>
                                </h1>
                                <p className="text-[14px]" style={{ color: C.muted }}>
                                    We&apos;ve verified your credentials. Let&apos;s set up your profile so patients can find you easily.
                                </p>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-left">
                                <h1 className="text-[34px] font-bold leading-tight mb-1" style={{ color: C.body }}>
                                    Select your availability
                                </h1>
                                <p className="text-[15px]" style={{ color: C.body }}>
                                    Set your time slots so that your patients see your availability
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Horizontal stepper */}
                    <div className="max-w-4xl mx-auto mb-3.5 px-2">
                        <HorizontalStepper step={step} />
                    </div>

                    {/* Form + context card */}
                    <div className="max-w-4xl mx-auto grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-4 items-start">

                        {/* Form card */}
                        <div ref={formCardRef} className="rounded-3xl px-5 py-5 lg:px-6 lg:py-5"
                            style={{
                                backgroundColor: formCardBackgroundByStep[step],
                                border:    `1px solid ${C.border}`,
                                boxShadow: "0 4px 32px rgba(6,91,75,0.07)",
                                transition: "background-color 280ms ease, border-color 280ms ease, box-shadow 280ms ease",
                            }}
                        >
                            {/* Step heading */}
                            <div className="mb-3.5 pb-3 border-b" style={{ borderColor: C.border }}>
                                <div className="flex items-center gap-2.5 mb-1">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                                        style={{ backgroundColor: C.primary }}>
                                        {step}
                                    </div>
                                    <h2 className="text-lg font-extrabold" style={{ color: C.primary }}>
                                        {PROFILE_STEPS[step - 1].label}
                                    </h2>
                                </div>
                                <p className="text-xs pl-8" style={{ color: C.muted }}>
                                    {PROFILE_STEPS[step - 1].sub}
                                </p>
                            </div>

                            <div ref={contentRef}>
                                {step === 1 && <StepClinicDetails />}
                                {step === 2 && <StepPracticeDetails />}
                                {step === 3 && <StepTimeSlots />}
                                {step === 4 && <StepProfileDetails />}
                            </div>
                        </div>

                        {/* Context card — hidden below xl, and hidden on step 3 to match design */}
                        <div className="hidden xl:block">
                            {step !== 3 && <ContextCard step={step} />}
                        </div>
                    </div>

                </div>

                {/* Bottom nav anchored by flex layout (no floating white-gap issue) */}
                <div className="px-5 pb-4 lg:px-6 lg:pb-5 mt-auto">
                    <div className="max-w-4xl mx-auto rounded-2xl px-4 py-3 flex items-center justify-between"
                        style={{
                            backgroundColor: "rgba(248,255,254,0.97)",
                            border: `1px solid ${C.border}`,
                            boxShadow: "0 2px 14px rgba(6,91,75,0.07)",
                        }}
                    >
                        <button
                            type="button"
                            onClick={() => step > 1 && goToStep(step - 1)}
                            disabled={step === 1}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{
                                borderColor:     C.border,
                                color:           C.primary,
                                backgroundColor: "white",
                                boxShadow:       "0 2px 8px rgba(6,91,75,0.08)",
                            }}
                        >
                            <ArrowLeft size={15} /> Back
                        </button>

                        <div className="hidden sm:flex items-center gap-2">
                            {PROFILE_STEPS.map(s => (
                                <div key={s.num}
                                    className="rounded-full transition-all duration-400"
                                    style={{
                                        width:           s.num === step ? "24px" : "8px",
                                        height:          "8px",
                                        backgroundColor: s.num === step ? C.primary : s.num < step ? C.mid : C.border,
                                    }} />
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                if (step < PROFILE_STEPS.length) {
                                    goToStep(step + 1);
                                } else {
                                    /*
                                     * TODO(backend): collect data from all step components and
                                     * submit the completed doctor profile to your API.
                                     *
                                     * Step data lives in local state inside each Step component.
                                     * Lift state to this page (or use a form context / React Hook Form)
                                     * before wiring the API call.
                                     *
                                     * Example:
                                     *   const payload = { clinic, practice, slots, photoUrl };
                                     *   await fetch('/api/doctors/profile', {
                                     *     method: 'POST',
                                     *     headers: { 'Content-Type': 'application/json' },
                                     *     body: JSON.stringify(payload),
                                     *   });
                                     *   router.push('/doctor-dashboard');
                                     */
                                    router.push("/");
                                }
                            }}
                            className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                            style={{
                                background: `linear-gradient(135deg, ${C.primary} 0%, ${C.mid} 100%)`,
                                boxShadow:  "0 4px 18px rgba(34,133,115,0.28)",
                            }}
                        >
                            {step === PROFILE_STEPS.length ? "Submit Profile" : "Save & Continue"}
                            {step < PROFILE_STEPS.length && <ArrowRight size={15} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
