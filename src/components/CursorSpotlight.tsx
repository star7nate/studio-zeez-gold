import { useEffect, useRef } from "react";

/** Soft gold radial that follows the cursor. Desktop + hover devices only. */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
          raf = 0;
        });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[55] h-[600px] w-[600px] opacity-60 mix-blend-screen will-change-transform hidden md:block"
      style={{
        background:
          "radial-gradient(circle, oklch(0.78 0.13 85 / 0.10), transparent 60%)",
      }}
    />
  );
}