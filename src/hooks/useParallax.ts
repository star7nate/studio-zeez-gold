import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to an element. The element's `--py` CSS variable
 * is updated with a scroll-relative offset in px, clamped and eased.
 * Disabled on reduced-motion.
 */
export function useParallax(speed = 0.2) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const factor = isMobile ? speed * 0.4 : speed;

    let ticking = false;
    const update = () => {
      const el = ref.current;
      if (!el) {
        ticking = false;
        return;
      }
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = -center * factor;
      el.style.setProperty("--py", `${offset.toFixed(2)}px`);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return ref;
}