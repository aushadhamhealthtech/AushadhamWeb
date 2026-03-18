import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type StatDef = {
  el: HTMLSpanElement;
  num: number;
  suffix: string;
  decimals?: number;
};

export function animateCounters(stats: StatDef[]) {
  stats.forEach(({ el, num, suffix, decimals = 0 }) => {
    const counter = { value: 0 };

    gsap.to(counter, {
      value: num,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        const current = decimals > 0 ? counter.value.toFixed(decimals) : Math.round(counter.value).toString();
        el.textContent = `${current}${suffix}`;
      },
      onComplete: () => {
        const finalValue = decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();
        el.textContent = `${finalValue}${suffix}`;
      },
    });
  });
}
