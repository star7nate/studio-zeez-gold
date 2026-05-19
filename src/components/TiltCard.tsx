import { useRef, type ReactNode } from "react";

/**
 * Lightweight 3D tilt wrapper. Uses CSS transforms + rAF.
 * Disabled on touch/coarse-pointer devices and when reduced-motion is set.
 */
export function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const enabled = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.matchMedia("(hover: none)").matches) return false;
    return true;
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled() || !ref.current) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--gx", `${px * 100}%`);
      el.style.setProperty("--gy", `${py * 100}%`);
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", `0deg`);
    ref.current.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ perspective: "1200px" }}
      className={className}
    >
      <div
        className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform:
            "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg)) translateZ(0)",
          transformStyle: "preserve-3d",
        }}
      >
        {children}
        {glare && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,220,140,0.35), transparent 55%)",
            }}
          />
        )}
      </div>
    </div>
  );
}