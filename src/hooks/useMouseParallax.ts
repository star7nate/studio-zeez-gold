import { useEffect, useRef } from "react";

/**
 * Tracks pointer position inside the element and writes
 * `--mx`, `--my` (px) and `--rx`, `--ry` (deg) CSS variables.
 * Skipped for reduced-motion + coarse pointer devices.
 */
export function useMouseParallax(strength = 14) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = 0,
      ty = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tx = px;
      ty = py;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.setProperty("--mx", `${tx * strength}px`);
          el.style.setProperty("--my", `${ty * strength}px`);
          el.style.setProperty("--rx", `${-ty * (strength * 0.4)}deg`);
          el.style.setProperty("--ry", `${tx * (strength * 0.4)}deg`);
          raf = 0;
        });
      }
    };
    const onLeave = () => {
      el.style.setProperty("--mx", `0px`);
      el.style.setProperty("--my", `0px`);
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}