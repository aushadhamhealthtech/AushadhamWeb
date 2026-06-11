"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Shield, Heart, Activity } from "lucide-react";
import AushadhamLogo from "@/components/ui/logo";
import { PanelIllustration } from "./PanelIllustration";
import type { View } from "./types";

export function LeftPanel({ view }: { view: View }) {
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!panelRef.current) return;
        const blobs = Array.from(panelRef.current.querySelectorAll<HTMLElement>(".auth-float"));
        const tweens = blobs.map((el, i) =>
            gsap.to(el, {
                y: i % 2 === 0 ? -10 : 9,
                x: i % 3 === 0 ? 5 : -4,
                duration: 3.5 + i * 0.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.4,
            })
        );
        return () => tweens.forEach(t => t.kill());
    }, []);

    const cfg: Record<View, { title: string; subtitle: string }> = {
        signin: { title: "Welcome back.", subtitle: "Your health journey continues here." },
        signup: { title: "Join 10,000+ users.", subtitle: "Access top doctors, anytime, anywhere." },
        "doctor-onboarding": { title: "Almost there.", subtitle: "Complete your profile to go live." },
        "forgot-password": { title: "Reset password.", subtitle: "A fresh start is just one email away." },
    };
    const { title, subtitle } = cfg[view];

    return (
        <div
            ref={panelRef}
            className="hidden lg:flex w-65 shrink-0 flex-col items-center justify-between px-6 py-8"
            style={{ background: "linear-gradient(160deg, var(--brand-dark) 0%, #1a7a65 52%, var(--brand-mid) 100%)" }}
        >
            <AushadhamLogo variant="white" size="sm" />
            <div className="flex flex-col items-center gap-5 flex-1 justify-center">
                <div className="auth-panel-text text-center">
                    <h2 className="text-[19px] font-extrabold text-white leading-tight mb-1.5">{title}</h2>
                    <p className="text-sm text-white/60 leading-relaxed">{subtitle}</p>
                </div>
                <div className="auth-panel-illustration w-full flex justify-center">
                    <PanelIllustration view={view} />
                </div>
            </div>
            <div className="flex items-end justify-center gap-5">
                {([
                    { Icon: Shield,   value: "100%",  label: "Secure" },
                    { Icon: Heart,    value: "10K+",  label: "Users" },
                    { Icon: Activity, value: "4.9★",  label: "Rating" },
                ] as const).map(({ Icon, value, label }) => (
                    <div key={label} className="auth-panel-badge flex flex-col items-center gap-1">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "rgba(255,255,255,0.13)" }}>
                            <Icon size={12} className="text-white" />
                        </div>
                        <span className="text-white font-bold text-xs">{value}</span>
                        <span className="text-white/50 text-[10px]">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
