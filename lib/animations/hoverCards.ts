import gsap from "gsap";

interface HoverConfig {
    scale?: number;
    y?: number;
    duration?: number;
}

/** Attach Vercel-style (scale + lift) hover to a single element. Returns cleanup fn. */
export function addCardHover(
    el: HTMLElement,
    { scale = 1.03, y = -8, duration = 0.3 }: HoverConfig = {}
) {
    const enter = () =>
        gsap.to(el, { scale, y, duration, ease: "power2.out", overwrite: "auto" });
    const leave = () =>
        gsap.to(el, { scale: 1, y: 0, duration, ease: "power2.out", overwrite: "auto" });

    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);

    return () => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
    };
}

/** Attach hover animation to all elements matching selector. Returns combined cleanup fn. */
export function addCardHovers(selector: string, config?: HoverConfig) {
    const els = gsap.utils.toArray<HTMLElement>(selector);
    const fns = els.map((el) => addCardHover(el, config));
    return () => fns.forEach((fn) => fn());
}
