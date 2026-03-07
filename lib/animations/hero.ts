import gsap from "gsap";

/**
 * Sequenced entrance timeline for hero section elements.
 * Must be called inside a useGSAP() callback so GSAP context scoping applies.
 * Fixes the "button disappears" bug with clearProps on the final element.
 */
export function animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-badge", { y: 15, opacity: 0, duration: 0.5 })
        .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "<0.1")
        .from(".hero-desc", { y: 30, opacity: 0, duration: 0.9 }, "<0.25")
        .from(".hero-learn-more", { y: 15, opacity: 0, duration: 0.7 }, "<0.2")
        .fromTo(
            ".hero-btn",
            { y: 20, opacity: 0 },
            // clearProps removes inline opacity/transform after completion,
            // preventing the button from staying hidden if the tween is interrupted.
            { y: 0, opacity: 1, duration: 0.8, clearProps: "opacity,transform" },
            "<0.15"
        );
    return tl;
}

/** Scale+fade entrance for the hero illustration. */
export function animateIllustrationEntrance(el: HTMLElement) {
    return gsap.fromTo(
        el,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, delay: 0.4, ease: "power3.out", clearProps: "transform,opacity" }
    );
}

/** Continuous floating loop — meant to start after entrance (delay: 1.35). */
export function animateIllustrationFloat(el: HTMLElement) {
    return gsap.to(el, {
        y: -10,
        duration: 3,
        delay: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });
}
