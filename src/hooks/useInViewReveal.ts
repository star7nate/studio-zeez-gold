import { useEffect } from "react";

/**
 * Marks descendants with `[data-reveal]` as `data-revealed="true"`
 * when they intersect the viewport. CSS handles the transition.
 * Mount once near the top of a route.
 */
export function useInViewReveal(selector = "[data-reveal]") {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.revealed = "true";
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}