import gsap from "gsap";

type HoverOptions = {
  scale?: number;
  y?: number;
  duration?: number;
};

export function addCardHovers(selector: string, options: HoverOptions = {}) {
  const { scale = 1.02, y = -6, duration = 0.25 } = options;
  const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));

  const listeners = elements.map((element) => {
    const onEnter = () => {
      gsap.to(element, { scale, y, duration, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(element, { scale: 1, y: 0, duration, ease: "power2.out" });
    };

    element.addEventListener("mouseenter", onEnter);
    element.addEventListener("mouseleave", onLeave);

    return { element, onEnter, onLeave };
  });

  return () => {
    listeners.forEach(({ element, onEnter, onLeave }) => {
      element.removeEventListener("mouseenter", onEnter);
      element.removeEventListener("mouseleave", onLeave);
      gsap.set(element, { clearProps: "transform" });
    });
  };
}
