"use client";

import { useRef, useEffect } from "react";
import SectionHeading from "@/components/ui/section-heading";

// Rich SVG illustrations for each vision card
function AccurateDiagnosisIllustration() {
    return (
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Background */}
            <rect x="0" y="0" width="280" height="160" rx="16" fill="#e8f5f2" />
            {/* Medical report / clipboard */}
            <rect x="60" y="20" width="100" height="120" rx="8" fill="white" stroke="#228573" strokeWidth="1.5" />
            <rect x="60" y="20" width="100" height="30" rx="8" fill="#228573" opacity="0.15" />
            {/* Clipboard top */}
            <rect x="95" y="14" width="30" height="12" rx="4" fill="#228573" opacity="0.4" />
            {/* Lines on report */}
            <path d="M75 65 h70 M75 78 h70 M75 91 h70 M75 104 h50" stroke="#228573" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            {/* Checkmark badge */}
            <circle cx="185" cy="55" r="28" fill="#228573" opacity="0.12" />
            <circle cx="185" cy="55" r="22" fill="#228573" opacity="0.2" stroke="#228573" strokeWidth="1.5" />
            <path d="M174 55 l7 7 l14-14" stroke="#228573" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Heartbeat line at bottom */}
            <rect x="55" y="130" width="170" height="22" rx="5" fill="white" stroke="#e8f5f2" strokeWidth="1.5" />
            <path d="M65 141 L85 141 L92 132 L100 150 L108 135 L116 141 L200 141" stroke="#3aa692" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
    );
}

function HolisticApproachIllustration() {
    return (
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="0" y="0" width="280" height="160" rx="16" fill="#e8f5f2" />
            {/* Human figure (holistic body) */}
            <circle cx="140" cy="48" r="22" fill="#228573" opacity="0.2" stroke="#228573" strokeWidth="1.5" />
            {/* Body */}
            <path d="M112 115 C112 90 122 78 140 75 C158 78 168 90 168 115" stroke="#228573" strokeWidth="2" fill="#228573" opacity="0.15" strokeLinecap="round" />
            {/* Orbiting icons / elements */}
            {/* Leaf - left (herb/plant) */}
            <circle cx="60" cy="75" r="18" fill="#3aa692" opacity="0.15" />
            <path d="M52 80 Q60 60 68 72 Q60 82 52 80Z" fill="#3aa692" opacity="0.6" />
            <path d="M60 80 v-12" stroke="#228573" strokeWidth="1.5" strokeLinecap="round" />
            {/* Mind/brain - top */}
            <circle cx="140" cy="20" r="14" fill="white" stroke="#228573" strokeWidth="1.2" />
            <path d="M132 20 Q134 15 138 18 Q140 13 143 18 Q147 14 149 20 Q150 24 147 26 Q143 29 140 27 Q137 29 133 26 Q130 23 132 20Z" fill="#228573" opacity="0.3" />
            {/* Exercise - right */}
            <circle cx="220" cy="75" r="18" fill="#228573" opacity="0.15" />
            <circle cx="220" cy="68" r="5" fill="#228573" opacity="0.3" />
            <path d="M212 80 L218 84 L224 78 L230 82" stroke="#228573" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            {/* Connecting arcs */}
            <path d="M75 70 Q108 50 126 35" stroke="#228573" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4" />
            <path d="M205 68 Q172 50 154 35" stroke="#228573" strokeWidth="1" strokeDasharray="3 3" fill="none" opacity="0.4" />
            {/* Bottom - wellness progress */}
            <rect x="50" y="128" width="180" height="16" rx="8" fill="white" />
            <rect x="50" y="128" width="130" height="16" rx="8" fill="#3aa692" opacity="0.5" />
            <text x="55" y="140" fontSize="7" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold">Wellness Progress</text>
            <text x="195" y="140" fontSize="7" fill="#065b4b" fontFamily="Inter, sans-serif" opacity="0.7">72%</text>
        </svg>
    );
}

function SubscriptionPlanIllustration() {
    return (
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect x="0" y="0" width="280" height="160" rx="16" fill="#e8f5f2" />
            {/* Credit card style */}
            <rect x="42" y="28" width="196" height="110" rx="12" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
            {/* Card header */}
            <rect x="42" y="28" width="196" height="45" rx="12" fill="#228573" />
            <rect x="42" y="55" width="196" height="18" fill="#228573" />
            <text x="58" y="50" fontSize="10" fill="white" fontFamily="Inter, sans-serif" fontWeight="bold" opacity="0.9">Aushadham Premium</text>
            <circle cx="210" cy="42" r="10" fill="white" opacity="0.15" />
            <circle cx="222" cy="42" r="10" fill="white" opacity="0.15" />
            {/* Plan features */}
            {[
                { text: "Unlimited Consultations", y: 90 },
                { text: "Lab Report Access", y: 106 },
                { text: "Priority Appointments", y: 122 },
            ].map((item) => (
                <g key={item.text}>
                    <circle cx="62" cy={item.y - 3} r="5" fill="#3aa692" opacity="0.3" />
                    <path d={`M59 ${item.y - 3} l2 2 l4-4`} stroke="#228573" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="72" y={item.y} fontSize="8" fill="#065b4b" fontFamily="Inter, sans-serif" opacity="0.8">{item.text}</text>
                </g>
            ))}
            {/* Price tag */}
            <rect x="178" y="82" width="52" height="48" rx="8" fill="#e8f5f2" />
            <text x="192" y="103" fontSize="7" fill="rgba(6,91,75,0.6)" fontFamily="Inter, sans-serif">From</text>
            <text x="183" y="117" fontSize="12" fill="#228573" fontFamily="Inter, sans-serif" fontWeight="bold">₹499</text>
            <text x="189" y="125" fontSize="6" fill="rgba(6,91,75,0.5)" fontFamily="Inter, sans-serif">/month</text>
        </svg>
    );
}

const visionCards = [
    {
        title: "Accurate Diagnosis",
        description:
            "Ensuring health issues are addressed correctly and trustfully, preventing the worsening of health conditions by providing reliable, expert-guided solutions.",
        illustration: <AccurateDiagnosisIllustration />,
        height: "h-[180px]",
    },
    {
        title: "Holistic Approach",
        description:
            "Empowering patients with the best advice by promoting a holistic approach to health, beyond just medication, ensuring comprehensive recovery and treatment.",
        illustration: <HolisticApproachIllustration />,
        height: "h-[180px]",
        featured: true,
    },
    {
        title: "Subscription Plan",
        description:
            "Treating patients holistically through our comprehensive subscription plan, delivering extensive benefits and promoting overall well-being.",
        illustration: <SubscriptionPlanIllustration />,
        height: "h-[180px]",
    },
];

// Reusable card renderer shared by desktop marquee and mobile swipe views
function VisionCard({ card }: { card: typeof visionCards[number] }) {
    return (
        <div className="rounded-3xl overflow-hidden flex flex-col flex-1">
            {/* SVG Illustration */}
            <div className={`${card.height} p-4`} style={{ backgroundColor: "#f0faf7" }}>
                {card.illustration}
            </div>
            {/* Content */}
            <div className="bg-white p-6 flex flex-col gap-3 flex-1">
                {card.featured && (
                    <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full w-fit"
                        style={{ backgroundColor: "#e8f5f2", color: "#228573" }}
                    >
                        ★ Most Popular
                    </span>
                )}
                <h3 className="font-bold text-[18px]" style={{ color: "#065b4b" }}>{card.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "rgba(6,91,75,0.65)" }}>{card.description}</p>
            </div>
        </div>
    );
}

export default function VisionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    // Single ref object to avoid stale closure issues
    const state = useRef({ paused: false, dragging: false, startX: 0, startScroll: 0 });

    useEffect(() => {
        const c = containerRef.current;
        const t = trackRef.current;
        if (!c || !t) return;

        let raf: number;
        let visible = true;
        const speed = 0.3; // px per frame

        const tick = () => {
            const s = state.current;
            if (visible && !s.paused && !s.dragging && !document.hidden) {
                c.scrollLeft += speed;
                const half = t.scrollWidth / 2;
                if (c.scrollLeft >= half) c.scrollLeft -= half;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        // Pause RAF work when section is off-screen
        const observer = new IntersectionObserver(
            ([entry]) => { visible = entry.isIntersecting; },
            { threshold: 0 }
        );
        observer.observe(c);

        // Document-level move/up so drag keeps working outside the container
        const onMove = (e: MouseEvent) => {
            const s = state.current;
            if (!s.dragging) return;
            const dx = e.clientX - s.startX;
            let next = s.startScroll - dx;
            const half = t.scrollWidth / 2;
            if (next < 0) next += half;
            if (next >= half) next -= half;
            c.scrollLeft = next;
        };

        const onUp = () => {
            state.current.dragging = false;
            state.current.paused = false;
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        const onDown = (e: MouseEvent) => {
            state.current.dragging = true;
            state.current.paused = true;
            state.current.startX = e.clientX;
            state.current.startScroll = c.scrollLeft;
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        };

        const onEnter = () => { state.current.paused = true; };
        const onLeave = () => { if (!state.current.dragging) state.current.paused = false; };
        const onTouchStart = () => { state.current.paused = true; };
        const onTouchEnd = () => { state.current.paused = false; };

        c.addEventListener("mousedown", onDown);
        c.addEventListener("mouseenter", onEnter);
        c.addEventListener("mouseleave", onLeave);
        c.addEventListener("touchstart", onTouchStart, { passive: true });
        c.addEventListener("touchend", onTouchEnd);

        return () => {
            cancelAnimationFrame(raf);
            observer.disconnect();
            c.removeEventListener("mousedown", onDown);
            c.removeEventListener("mouseenter", onEnter);
            c.removeEventListener("mouseleave", onLeave);
            c.removeEventListener("touchstart", onTouchStart);
            c.removeEventListener("touchend", onTouchEnd);
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };
    }, []);

    const marqueeCards = [...visionCards, ...visionCards];

    return (
        <section id="vision" className="py-20 bg-white">
            {/* Section heading */}
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[92px]">
                <div className="mb-14">
                    <SectionHeading title="Our Vision" />
                </div>
            </div>

            {/* Scrollable marquee — auto-scrolls via RAF, draggable with cursor */}
            <div
                ref={containerRef}
                className="overflow-x-auto cursor-grab active:cursor-grabbing select-none"
                style={{ scrollbarWidth: "none" }}
            >
                <div ref={trackRef} className="flex gap-4 md:gap-6 w-max px-6 lg:px-[92px] py-6">
                    {marqueeCards.map((card, i) => (
                        <div
                            key={i}
                            className={`rounded-3xl border shadow-sm flex flex-col w-[270px] md:w-[380px] flex-shrink-0 transition-transform duration-300 ease-out hover:scale-[1.05] ${
                                card.featured
                                    ? "shadow-lg border-[#c8ebe3]"
                                    : "border-[#e8f5f2]"
                            }`}
                        >
                            <VisionCard card={card} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
