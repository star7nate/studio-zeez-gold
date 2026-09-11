import { useEffect, useRef } from "react";

/**
 * Tracks pointer position inside the element and writes smoothed
 * `--mx`, `--my` (px) and `--rx`, `--ry` (deg) CSS variables via a rAF lerp,
 * so the scene glides rather than snapping to the cursor.
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

    let raf: number | null = null;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", `${(cx * strength).toFixed(2)}px`);
      el.style.setProperty("--my", `${(cy * strength).toFixed(2)}px`);
      el.style.setProperty("--rx", `${(-cy * strength * 0.4).toFixed(3)}deg`);
      el.style.setProperty("--ry", `${(cx * strength * 0.4).toFixed(3)}deg`);
      const settled = Math.abs(tx - cx) < 0.0008 && Math.abs(ty - cy) < 0.0008;
      raf = settled ? null : requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width - 0.5;
      ty = (e.clientY - rect.top) / rect.height - 0.5;
      start();
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      start();
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      if (raf != null) cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return ref;
}
