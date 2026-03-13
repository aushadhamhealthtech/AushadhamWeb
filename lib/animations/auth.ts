import gsap from "gsap";

/**
 * Full-page auth entrance — staggers the left visual panel, then the form card.
 * Call inside useGSAP() so the context is properly scoped.
 */
export function animateAuthEntrance() {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Left decorative panel — blobs float in from different directions
    tl.from(".auth-blob-1", { scale: 0.4, opacity: 0, duration: 1.1, ease: "back.out(1.4)" })
      .from(".auth-blob-2", { scale: 0.5, opacity: 0, duration: 0.9, ease: "back.out(1.2)" }, "<0.15")
      .from(".auth-blob-3", { x: -30, opacity: 0, duration: 0.8 }, "<0.1")
      .from(".auth-panel-text", { y: 28, opacity: 0, duration: 0.9 }, "<0.2")
      .from(".auth-panel-badge", { y: 16, opacity: 0, duration: 0.7, stagger: 0.12 }, "<0.15");

    // Form card slides in from the right
    tl.from(".auth-card", { x: 60, opacity: 0, duration: 0.85, ease: "power3.out" }, "<0.25");

    // Logo pops in
    tl.from(".auth-logo", { scale: 0.7, opacity: 0, duration: 0.5, ease: "back.out(2)" }, "<0.1");

    // Staggered field reveals
    tl.from(".auth-field", { y: 18, opacity: 0, duration: 0.5, stagger: 0.09 }, "<0.2");

    // CTA button pops last
    tl.fromTo(
        ".auth-cta",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, clearProps: "opacity,transform" },
        "<0.15"
    );

    // Bottom links
    tl.from(".auth-footer-link", { opacity: 0, duration: 0.4, stagger: 0.08 }, "<0.1");

    return tl;
}

/** Continuous floating loop for decorative visual-panel elements. */
export function animateAuthBlobs(container: HTMLElement) {
    const blobs = Array.from(container.querySelectorAll<HTMLElement>(".auth-float"));
    blobs.forEach((el, i) => {
        gsap.to(el, {
            y: i % 2 === 0 ? -12 : 10,
            x: i % 3 === 0 ? 6 : -4,
            duration: 3.5 + i * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.4,
        });
    });
}

/** Role-tab switch flash — briefly lights up the selected tab. */
export function animateRoleSwitch(el: HTMLElement) {
    gsap.fromTo(
        el,
        { scale: 0.94 },
        { scale: 1, duration: 0.35, ease: "back.out(2)" }
    );
}

/** Shake a form field to indicate validation error. */
export function shakeField(el: HTMLElement) {
    gsap.fromTo(
        el,
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(1.5, 0.4)" }
    );
}
