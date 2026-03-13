import gsap from "gsap";

export interface StatDef {
    el: HTMLSpanElement;
    num: number;
    suffix: string;
    decimals: number;
}

/** Animate a single stat counter from 0 to its target value when scrolled into view. */
export function animateCounter({ el, num, suffix, decimals }: StatDef) {
    const obj = { val: 0 };
    return gsap.to(obj, {
        val: num,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate() {
            el.textContent =
                decimals > 0
                    ? obj.val.toFixed(decimals) + suffix
                    : Math.floor(obj.val) + suffix;
        },
    });
}

/** Animate an array of stat counters. */
export function animateCounters(stats: StatDef[]) {
    return stats.map(animateCounter);
}
