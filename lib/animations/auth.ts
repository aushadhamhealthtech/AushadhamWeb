import gsap from "gsap";

/** Shake a form field to indicate validation error. */
export function shakeField(el: HTMLElement) {
    gsap.fromTo(
        el,
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(1.5, 0.4)" }
    );
}
