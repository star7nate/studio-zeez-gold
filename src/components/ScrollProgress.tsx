import { useEffect, useRef } from "react";

/** Thin gold scroll progress bar, fixed to the very top edge. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${p})`;
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 inset-x-0 z-[60] h-[2px] origin-left"
      style={{
        background:
          "linear-gradient(90deg, transparent, oklch(0.82 0.14 85), oklch(0.88 0.09 88))",
      }}
      ref={ref}
    />
  );
}