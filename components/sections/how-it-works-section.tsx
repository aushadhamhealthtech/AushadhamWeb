"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SectionHeading from "@/components/ui/section-heading";
import { revealCards } from "@/lib/animations/scrollReveal";

const steps = [
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 4 L28 10 V16 C28 22 22 27 16 29 C10 27 4 22 4 16 V10 Z" stroke="#228573" strokeWidth="2" fill="#e8f5f2" />
                <path d="M10 16 h12 M16 10 v12" stroke="#228573" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: "Upload Medical Info",
        description: "Securely upload and store all your medical records, prescriptions and reports in one place.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="24" height="28" rx="3" stroke="#228573" strokeWidth="2" fill="#e8f5f2" />
                <path d="M9 12 h14 M9 17 h14 M9 22 h9" stroke="#228573" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        title: "Access Digital Case Sheet",
        description: "Doctors can instantly view your complete medical history and case sheets digitally.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="6" width="24" height="22" rx="3" stroke="#228573" strokeWidth="2" fill="#e8f5f2" />
                <path d="M4 12 h24" stroke="#228573" strokeWidth="2" />
                <path d="M10 4 v4 M22 4 v4" stroke="#228573" strokeWidth="2" strokeLinecap="round" />
                <circle cx="16" cy="20" r="3" fill="#228573" opacity="0.4" />
            </svg>
        ),
        title: "Book Appointment",
        description: "Schedule online video or in-clinic consultations with specialist doctors instantly.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" stroke="#228573" strokeWidth="2" fill="#e8f5f2" />
                <path d="M10 16 l4 4 l8-8" stroke="#228573" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        title: "Create Secure Follow-up",
        description: "Set up follow-up reminders and keep your care team in sync throughout your treatment.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 28 V10 L16 4 L26 10 V28" stroke="#228573" strokeWidth="2" fill="#e8f5f2" strokeLinejoin="round" />
                <path d="M12 28 V19 h8 v9" stroke="#228573" strokeWidth="2" />
            </svg>
        ),
        title: "Upload Lab Reports",
        description: "Share lab and diagnostic reports directly with your doctor for faster analysis.",
    },
    {
        icon: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="12" stroke="#228573" strokeWidth="2" fill="#e8f5f2" />
                <path d="M11 16 Q13 12 16 16 Q19 20 21 16" stroke="#228573" strokeWidth="2" fill="none" strokeLinecap="round" />
                <path d="M16 8 v2 M16 22 v2 M8 16 h2 M22 16 h2" stroke="#228573" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
        title: "Subscription Plan",
        description: "Choose a plan that suits you — unlimited consultations, reports access, and more.",
    },
];

export default function HowItWorksSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            revealCards(".step-card", sectionRef.current, { stagger: 0.2 });
        }
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} id="how-it-works" className="steps-section py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-[92px]">
                <div className="mb-14">
                    <SectionHeading title="How Aushadham works" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {steps.map((step, i) => (
                        <div
                            key={step.title}
                            className="step-card"
                        >
                            <div className="group flex items-start gap-5 p-6 rounded-2xl border border-[#e8f5f2] bg-white hover:bg-[#f0faf7] hover:border-[#3aa692] hover:scale-[1.05] transition-all duration-300 ease-out h-full">
                                <div className="shrink-0 w-14 h-14 rounded-full bg-[#e8f5f2] group-hover:bg-[#d1ece6] flex items-center justify-center transition-colors duration-200">
                                    {step.icon}
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-[#3aa692] bg-[#e8f5f2] px-2 py-0.5 rounded-full">
                                            Step {i + 1}
                                        </span>
                                    </div>
                                    <h3 className="text-[#065b4b] font-bold text-[16px] leading-snug">{step.title}</h3>
                                    <p className="text-[#065b4b]/60 text-sm leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
