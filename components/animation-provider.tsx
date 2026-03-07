"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { addCardHovers } from "@/lib/animations/hoverCards";
import { revealSection } from "@/lib/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Staggered card reveals for sections that have .reveal-item children
            (["#testimonials", "#experts"] as const).forEach((id) => {
                const section = document.querySelector(id);
                if (!section) return;
                const items = section.querySelectorAll(".reveal-item");
                if (!items.length) return;
                gsap.from(items, {
                    scrollTrigger: { trigger: section, start: "top 80%", once: true },
                    opacity: 0,
                    y: 40,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "power2.out",
                });
            });

            // Simple fade-in for all other sections (mission, vision, CTA, footer)
            const simpleSections = gsap.utils.toArray<HTMLElement>(
                "section:not(#hero):not(#how-it-works):not(#testimonials):not(#experts), footer"
            );
            simpleSections.forEach((el) => revealSection(el));
        });

        // Vercel-style hover: scale up + lift — added outside context so cleanup is manual
        const cleanupHovers = addCardHovers(".card-hover", { scale: 1.03, y: -8, duration: 0.3 });

        return () => {
            ctx.revert();
            cleanupHovers();
        };
    }, []);

    return <>{children}</>;
}

