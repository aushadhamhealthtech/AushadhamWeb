import gsap from "gsap";

export function animateHeroEntrance() {
  const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

  timeline
    .from(".hero-badge", { opacity: 0, y: 16, duration: 0.45 })
    .from(".hero-title", { opacity: 0, y: 24, duration: 0.55 }, "-=0.2")
    .from(".hero-desc", { opacity: 0, y: 20, duration: 0.45 }, "-=0.25")
    .from(".hero-btn", { opacity: 0, y: 16, duration: 0.4, clearProps: "transform,opacity" }, "-=0.2")
    .from(".hero-learn-more", { opacity: 0, y: 10, duration: 0.35 }, "-=0.22");
}

export function animateIllustrationEntrance(element: HTMLElement) {
  gsap.fromTo(
    element,
    { opacity: 0, y: 24, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
  );
}

export function animateIllustrationFloat(element: HTMLElement) {
  gsap.to(element, {
    y: -8,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}
