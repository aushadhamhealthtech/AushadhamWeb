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
            // Feature icons "draw" animation — each icon's SVG strokes are traced path-by-path
            const doctorsSection = document.querySelector("#doctors");
            if (doctorsSection) {
                const featureIconEls = Array.from(doctorsSection.querySelectorAll<HTMLElement>(".feature-icon"));
                if (featureIconEls.length) {
                    // 1. Colored background pops in with a bouncy scale
                    const iconBgs = featureIconEls.map((el) => el.querySelector(".icon-bg")).filter(Boolean);
                    gsap.from(iconBgs, {
                        scrollTrigger: { trigger: doctorsSection, start: "top 70%", once: true },
                        scale: 0,
                        duration: 0.45,
                        stagger: 0.13,
                        ease: "back.out(1.7)",
                    });

                    // 2. SVG paths are drawn via strokeDashoffset (creates a "being sketched" effect)
                    featureIconEls.forEach((iconEl, i) => {
                        const paths = Array.from(
                            iconEl.querySelectorAll("svg path, svg circle, svg line, svg polyline, svg rect, svg ellipse")
                        ) as SVGGeometryElement[];
                        if (!paths.length) return;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        gsap.fromTo(
                            paths,
                            {
                                strokeDasharray: (_: number, el: SVGGeometryElement) => el.getTotalLength?.() ?? 60,
                                strokeDashoffset: (_: number, el: SVGGeometryElement) => el.getTotalLength?.() ?? 60,
                            } as any,
                            {
                                scrollTrigger: { trigger: doctorsSection, start: "top 70%", once: true },
                                strokeDashoffset: 0,
                                duration: 0.7,
                                delay: i * 0.13 + 0.22,
                                stagger: 0.06,
                                ease: "power2.inOut",
                            }
                        );
                    });

                    // 3. Labels appear after icons finish drawing
                    const labels = featureIconEls.map((el) => el.querySelector("span")).filter(Boolean);
                    gsap.from(labels, {
                        scrollTrigger: { trigger: doctorsSection, start: "top 70%", once: true },
                        opacity: 0,
                        y: 8,
                        duration: 0.4,
                        delay: 0.9,
                        stagger: 0.1,
                        ease: "power2.out",
                    });
                }
            }

            // Staggered card reveals for sections that have .reveal-item children
            (["#testimonials", "#experts"] as const).forEach((id) => {
                const section = document.querySelector(id);
                if (!section) return;
                const items = section.querySelectorAll(".reveal-item");
                if (!items.length) return;

                // If the section is already in view (e.g. page loaded scrolled down
                // or navigated via hash), skip the animation so cards aren't stuck at opacity: 0
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    return; // already visible, no animation needed
                }

                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40 },
                    {
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            once: true,
                        },
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.15,
                        ease: "power2.out",
                    }
                );

                // Safety net: if ScrollTrigger never fires (e.g. hash navigation timing),
                // force cards visible after 1.5s
                setTimeout(() => {
                    items.forEach((el) => {
                        const style = getComputedStyle(el);
                        if (style.opacity === "0") {
                            gsap.to(el, { opacity: 1, y: 0, duration: 0.4 });
                        }
                    });
                }, 1500);
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

