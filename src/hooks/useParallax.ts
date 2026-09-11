import { useEffect, useRef } from "react";

/**
 * Returns a ref to attach to an element. The element's `--py` CSS variable
 * is updated with a scroll-relative offset in px, smoothed with a rAF lerp so
 * the movement glides instead of stepping with each scroll event.
 * Disabled on reduced-motion.
 */
export function useParallax(speed = 0.2) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const factor = isMobile ? speed * 0.35 : speed;

    let target = 0;
    let current = 0;
    let raf: number | null = null;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      target = -center * factor;
    };

    const tick = () => {
      const el = ref.current;
      if (!el) {
        raf = null;
        return;
      }
      current += (target - current) * 0.1;
      el.style.setProperty("--py", `${current.toFixed(2)}px`);
      raf = Math.abs(target - current) < 0.1 ? null : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    measure();
    current = target;
    const el = ref.current;
    if (el) el.style.setProperty("--py", `${current.toFixed(2)}px`);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return ref;
}
