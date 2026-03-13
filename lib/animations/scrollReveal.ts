import gsap from "gsap";

interface RevealConfig {
    start?: string;
    stagger?: number;
    y?: number;
    duration?: number;
}

/** Fade-in a single section element from a y offset on scroll. */
export function revealSection(
    trigger: Element,
    { y = 30, duration = 0.7, start = "top 85%" }: RevealConfig = {}
) {
    return gsap.from(trigger, {
        scrollTrigger: { trigger, start, once: true },
        opacity: 0,
        y,
        duration,
        ease: "power2.out",
    });
}

/**
 * Staggered fade-in of all elements matching `selector` inside `trigger`.
 * Call inside useGSAP() so the selector is automatically scoped to context.
 */
export function revealCards(
    selector: string,
    trigger: string | Element,
    { start = "top 80%", stagger = 0.15, y = 40, duration = 0.6 }: RevealConfig = {}
) {
    return gsap.from(selector, {
        scrollTrigger: { trigger, start, once: true },
        opacity: 0,
        y,
        duration,
        stagger,
        ease: "power2.out",
    });
}
