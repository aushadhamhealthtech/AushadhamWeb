"use client";
// Figma illustration asset (node 9:2714)
// Inline SVG — no external dependency, matches Figma design: patient + doctor consultation + medical items
import { useRef } from "react";
import { Upload, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { animateHeroEntrance, animateIllustrationEntrance, animateIllustrationFloat } from "@/lib/animations/hero";
import { animateCounters, type StatDef } from "@/lib/animations/statsCounter";

const heroStats = [
    { num: 500, suffix: "+", label: "Doctors", decimals: 0 },
    { num: 10, suffix: "K+", label: "Patients", decimals: 0 },
    { num: 4.9, suffix: "\u2605", label: "Rating", decimals: 1 },
];

// Doctor consultation illustration — matches Figma node 9:2714
// Scene: patient in armchair (left) + doctor on monitor screen (center) + medicine items (right)
function DoctorConsultationIllustration() {
    return (
        <svg viewBox="0 0 520 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">

            {/* ── Background soft circle ── */}
            <ellipse cx="260" cy="175" rx="230" ry="160" fill="#e8f5f2" opacity="0.5" />

            {/* ═══════════════════════════════
                LEFT: Patient sitting in chair
            ═══════════════════════════════ */}

            {/* Armchair */}
            <rect x="28" y="200" width="105" height="70" rx="12" fill="#f59e0b" />
            {/* Chair seat */}
            <rect x="28" y="220" width="105" height="50" rx="8" fill="#fbbf24" />
            {/* Chair back */}
            <rect x="28" y="170" width="18" height="80" rx="9" fill="#f59e0b" />
            <rect x="115" y="170" width="18" height="80" rx="9" fill="#f59e0b" />
            {/* Chair legs */}
            <rect x="35" y="265" width="10" height="30" rx="5" fill="#d97706" />
            <rect x="120" y="265" width="10" height="30" rx="5" fill="#d97706" />

            {/* Patient body */}
            <path d="M55 215 C55 185 65 172 82 168 C99 172 109 185 109 215 L112 265 H52 Z" fill="#ef4444" opacity="0.85" />
            {/* Patient head */}
            <circle cx="82" cy="148" r="26" fill="#fdba74" />
            {/* Hair */}
            <path d="M58 143 Q62 122 82 120 Q102 122 106 143" fill="#1f2937" />
            {/* Patient arm raised (talking gesture) */}
            <path d="M55 200 L32 175 L26 168" stroke="#fdba74" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
            {/* Hand */}
            <circle cx="24" cy="165" r="9" fill="#fdba74" />
            {/* Patient legs */}
            <rect x="55" y="255" width="24" height="40" rx="8" fill="#065b4b" />
            <rect x="88" y="255" width="24" height="40" rx="8" fill="#065b4b" />
            {/* Shoes */}
            <ellipse cx="67" cy="295" rx="15" ry="6" fill="#1f2937" />
            <ellipse cx="100" cy="295" rx="15" ry="6" fill="#1f2937" />

            {/* Doctor Consultation Online badge (from Figma) */}
            <rect x="30" y="308" width="140" height="26" rx="8" fill="#065b4b" />
            <text x="48" y="325" fontSize="9" fill="white" fontFamily="Inter,sans-serif" fontWeight="600">Doctor Consultation</text>
            <text x="70" y="338" fontSize="9" fill="white" fontFamily="Inter,sans-serif" fontWeight="600">Online</text>

            {/* ═══════════════════════════════
                CENTER: Monitor / screen
            ═══════════════════════════════ */}

            {/* Monitor stand */}
            <rect x="220" y="280" width="80" height="14" rx="7" fill="#9ca3af" />
            <rect x="252" y="250" width="16" height="34" rx="4" fill="#9ca3af" />
            {/* Monitor bezel */}
            <rect x="155" y="95" width="210" height="160" rx="16" fill="#1f2937" />
            {/* Screen */}
            <rect x="163" y="103" width="194" height="144" rx="10" fill="#065b4b" />

            {/* Doctor on screen — head */}
            <circle cx="260" cy="140" r="28" fill="#fdba74" />
            {/* Doctor hair (dark, long) */}
            <path d="M234 135 Q236 112 260 108 Q284 112 286 135 L286 148 Q278 158 260 160 Q242 158 234 148 Z" fill="#374151" />
            {/* Doctor white coat */}
            <path d="M225 195 C225 170 238 158 260 155 C282 158 295 170 295 195 L300 247 H220 Z" fill="white" />
            {/* Coat lapels */}
            <path d="M260 155 L250 178 M260 155 L270 178" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Stethoscope on doctor */}
            <path d="M250 162 C243 168 240 177 243 184 C246 190 253 190 255 184" stroke="#3aa692" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="255" cy="185" r="4" fill="#3aa692" />
            {/* Doctor wave arm */}
            <path d="M295 175 L315 165 L322 160" stroke="#fdba74" strokeWidth="14" strokeLinecap="round" />
            <circle cx="323" cy="158" r="8" fill="#fdba74" />

            {/* ═══════════════════════════════
                RIGHT: Medicine items
            ═══════════════════════════════ */}

            {/* Thermometer (top-right floating) */}
            <rect x="415" y="80" width="18" height="80" rx="9" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1.5" />
            <circle cx="424" cy="155" r="11" fill="#ef4444" opacity="0.85" />
            <rect x="420" y="90" width="8" height="55" rx="4" fill="#ef4444" opacity="0.7" />
            <rect x="420" y="90" width="8" height="30" rx="4" fill="#ef4444" />

            {/* Pill blister pack */}
            <rect x="395" y="170" width="95" height="60" rx="8" fill="#a78bfa" opacity="0.9" />
            {/* Pill blisters 3x2 grid — explicit to avoid nested array issue */}
            <ellipse cx="412" cy="188" rx="10" ry="8" fill="#ede9fe" />
            <ellipse cx="440" cy="188" rx="10" ry="8" fill="#ede9fe" />
            <ellipse cx="468" cy="188" rx="10" ry="8" fill="#ede9fe" />
            <ellipse cx="412" cy="210" rx="10" ry="8" fill="#ede9fe" />
            <ellipse cx="440" cy="210" rx="10" ry="8" fill="#ede9fe" />
            <ellipse cx="468" cy="210" rx="10" ry="8" fill="#ede9fe" />

            {/* Medicine bottle */}
            <rect x="440" y="200" width="50" height="80" rx="10" fill="#fbbf24" />
            {/* Bottle label */}
            <rect x="444" y="218" width="42" height="38" rx="5" fill="white" opacity="0.9" />
            <text x="452" y="232" fontSize="7" fill="#065b4b" fontFamily="Inter,sans-serif" fontWeight="700">MEDICINE</text>
            <path d="M448 240 h30 M448 246 h20" stroke="#228573" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            {/* Bottle cap */}
            <rect x="447" y="190" width="36" height="16" rx="6" fill="#d97706" />

            {/* ── Floating pill accent (top-left of scene) ── */}
            <rect x="145" y="55" width="50" height="22" rx="11" fill="#228573" opacity="0.2" stroke="#228573" strokeWidth="1.5" />
            <rect x="145" y="55" width="25" height="22" rx="11" fill="#228573" opacity="0.5" />
            <line x1="170" y1="55" x2="170" y2="77" stroke="#228573" strokeWidth="1.5" />

            {/* ── Floating pill accent (top-right of scene) ── */}
            <rect x="350" y="48" width="50" height="22" rx="11" transform="rotate(-30 375 59)" fill="#3aa692" opacity="0.25" stroke="#3aa692" strokeWidth="1.5" />
        </svg>
    );
}

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const illustrationRef = useRef<HTMLDivElement>(null);
    const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

    function handleUploadCta() {
        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
    }

    useGSAP(() => {
        // Hero entrance — sequenced timeline with clearProps on button (fixes disappearing bug)
        animateHeroEntrance();

        // Illustration: scale+fade entrance, then continuous float loop
        if (illustrationRef.current) {
            animateIllustrationEntrance(illustrationRef.current);
            animateIllustrationFloat(illustrationRef.current);
        }

        // Stats count-up triggered on scroll
        const statList: StatDef[] = heroStats
            .map((stat, i) => ({ el: statRefs.current[i], num: stat.num, suffix: stat.suffix, decimals: stat.decimals }))
            .filter((s): s is StatDef => s.el !== null);
        animateCounters(statList);
    }, { scope: containerRef });

    return (
        <section ref={containerRef} id="hero" className="relative overflow-hidden" style={{ background: "linear-gradient(175deg, #e8f5f2 0%, #f0faf7 45%, #ffffff 80%)" }}>
            {/* Soft background blob — clip wrapper ends bubble at bottom of headline on mobile */}
            <div className="absolute top-0 right-0 left-0 h-[320px] md:h-[600px] overflow-hidden pointer-events-none">
                <div
                    className="absolute rounded-full opacity-15 top-[-80px] right-[-80px] w-[420px] h-[420px] md:top-[-120px] md:right-[-120px] md:w-[700px] md:h-[700px]"
                    style={{ backgroundColor: "#3aa692" }}
                />
            </div>

            {/* ── BLOCK 1: Headline + Upload CTA ── */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[99px] pt-10 md:pt-20 pb-16 relative z-10">
                <div className="flex flex-col gap-4 md:gap-7 max-w-[620px]">
                    <div className="hero-badge inline-flex items-center gap-2 text-sm font-medium" style={{ color: "#228573" }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#3aa692" }} />
                        Healthcare made simple
                    </div>

                    <h1
                        className="hero-title text-[44px] md:text-[58px] font-extrabold leading-[1.1] tracking-tight"
                        style={{ color: "#065b4b" }}
                    >
                        Upload Your Health Records{" "}
                        <br />
                        <span style={{ color: "#228573" }}>Use Them Anytime, Anywhere</span>
                    </h1>

                    <p className="hero-desc text-[17px] leading-relaxed" style={{ color: "rgba(6,91,75,0.7)" }}>
                        Aushadham allows you to store your medical history and reports in your profile for no additional cost.
                    </p>

                    <div className="flex flex-col gap-3 md:gap-6 mt-6 md:mt-12">
                        <button
                            onClick={handleUploadCta}
                            aria-label="Upload your health reports"
                            className="hero-btn group inline-flex items-center gap-3 px-8 py-4 text-white text-[17px] font-semibold rounded-full w-fit transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.02]"
                            style={{ backgroundColor: "#065b4b" }}
                        >
                            <Upload size={19} />
                            Upload Your Reports Now
                        </button>

                        <Link
                            href="/learn-more"
                            className="hero-learn-more text-sm font-semibold hover:underline w-fit"
                            style={{ color: "#228573" }}
                        >
                            Learn more →
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── BLOCK 2: Illustration (left) + Connect With Doctors (right) ── */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[99px] pb-24 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Illustration */}
                    <div
                        ref={illustrationRef}
                        className="rounded-[28px] shadow-lg border border-[#d1ece6] overflow-hidden"
                        style={{ background: "linear-gradient(135deg, #e8f5f2 0%, #c8ebe3 100%)" }}
                    >
                        <div className="px-6 pt-6 pb-4">
                            <DoctorConsultationIllustration />
                        </div>
                    </div>

                    {/* Right: Connect With Doctors copy + Book CTA */}
                    <div className="flex flex-col gap-7">
                        <h2
                            className="text-[38px] md:text-[48px] font-extrabold leading-[1.1] tracking-tight"
                            style={{ color: "#065b4b" }}
                        >
                            Connect With Doctors{" "}
                            <br />
                            <span style={{ color: "#228573" }}>Direct Consult Online</span>
                        </h2>

                        <p className="text-[16px] leading-relaxed" style={{ color: "rgba(6,91,75,0.7)" }}>
                            Skip the waiting room and connect with top doctors across India via Video Call or In-Clinic visit. Your Health, Your Schedule!
                        </p>

                        <Link
                            href="/book-appointment"
                            className="inline-flex items-center gap-3 px-8 py-4 text-white text-[17px] font-semibold rounded-full w-fit transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                            style={{ backgroundColor: "#228573" }}
                        >
                            <CalendarCheck size={19} />
                            Book an Appointment
                        </Link>

                        {/* Stats */}
                        <div className="flex items-center gap-10 mt-2">
                            {heroStats.map((stat, i) => (
                                <div key={stat.label} className="flex flex-col">
                                    <span
                                        ref={(el) => { statRefs.current[i] = el; }}
                                        className="text-2xl font-extrabold"
                                        style={{ color: "#065b4b" }}
                                    >
                                        {stat.decimals > 0 ? stat.num.toFixed(stat.decimals) : stat.num}{stat.suffix}
                                    </span>
                                    <span className="text-sm" style={{ color: "rgba(6,91,75,0.55)" }}>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
