import { useEffect, useRef, type ReactNode } from "react";

/**
 * Lightweight 3D tilt wrapper with rAF smoothing (lerp) so motion eases in and
 * out instead of snapping. Disabled on touch/coarse-pointer devices and when
 * reduced-motion is set.
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
  const inner = useRef<HTMLDivElement>(null);
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const raf = useRef<number | null>(null);
  const enabled = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    enabled.current =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(hover: none)").matches;
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const tick = () => {
    const el = inner.current;
    if (!el) {
      raf.current = null;
      return;
    }
    const c = current.current;
    const t = target.current;
    const ease = 0.12;
    c.rx += (t.rx - c.rx) * ease;
    c.ry += (t.ry - c.ry) * ease;
    c.gx += (t.gx - c.gx) * ease;
    c.gy += (t.gy - c.gy) * ease;
    el.style.setProperty("--rx", `${c.rx.toFixed(3)}deg`);
    el.style.setProperty("--ry", `${c.ry.toFixed(3)}deg`);
    el.style.setProperty("--gx", `${c.gx.toFixed(2)}%`);
    el.style.setProperty("--gy", `${c.gy.toFixed(2)}%`);

    const settled =
      Math.abs(t.rx - c.rx) < 0.01 &&
      Math.abs(t.ry - c.ry) < 0.01 &&
      Math.abs(t.gx - c.gx) < 0.1 &&
      Math.abs(t.gy - c.gy) < 0.1;
    raf.current = settled ? null : requestAnimationFrame(tick);
  };

  const start = () => {
    if (raf.current == null) raf.current = requestAnimationFrame(tick);
  };

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    target.current = {
      rx: (0.5 - py) * max,
      ry: (px - 0.5) * max,
      gx: px * 100,
      gy: py * 100,
    };
    start();
  };

  const onLeave = () => {
    target.current = { rx: 0, ry: 0, gx: 50, gy: 50 };
    start();
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
        ref={inner}
        className="relative h-full w-full will-change-transform"
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
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100 mix-blend-overlay"
            style={{
              background:
                "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,220,140,0.28), transparent 55%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
