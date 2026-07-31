import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import portrait from "@/assets/studio-zeez-ceo.jpg";
import { ArrowRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import { ParticleField } from "@/components/ParticleField";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Studio Zeez" },
      { name: "description", content: "Studio Zeez is a luxury photography practice based in New York, working worldwide for editorial, brand, and private clients." },
      { property: "og:title", content: "About — Studio Zeez" },
      { property: "og:description", content: "A luxury photography practice in gold and shadow." },
      { property: "og:image", content: portrait },
      { name: "twitter:image", content: portrait },
    ],
  }),
});

function About() {
  const portraitRef = useParallax(0.18) as React.RefObject<HTMLImageElement>;
  const sceneRef = useMouseParallax(14) as React.RefObject<HTMLDivElement>;
  return (
    <SiteLayout>
      <section ref={sceneRef} className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28 grid md:grid-cols-12 gap-12 items-center scene-3d">
        <ParticleField />
        <div className="md:col-span-5 preserve-3d" data-reveal="left">
          <div
            className="relative aspect-[4/5] overflow-hidden border border-border/60 shadow-elegant floating-frame depth-glow"
            style={{ transform: "translate3d(var(--mx,0px), var(--my,0px), 30px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))" }}
          >
            <img
              ref={portraitRef}
              src={portrait}
              alt="Studio Zeez founder and CEO portrait"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover will-change-transform"
              style={{ transform: "translate3d(0, var(--py, 0px), 0) scale(1.08)" }}
            />
          </div>
        </div>
        <div className="md:col-span-7" data-reveal="right">
          <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">The Founder</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Behind every <span className="text-gradient-gold italic">frame</span>.
          </h1>
          <div className="gold-divider w-24 mt-8" />
          <div className="mt-8 space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p data-reveal>
              Studio Zeez was founded in 2017 with a simple obsession: that a photograph should feel
              like a relic. Something you'd find in a velvet-lined drawer a hundred years from now
              and still feel its pulse.
            </p>
            <p data-reveal style={{ transitionDelay: "120ms" }}>
              Working from Nigeria and on assignment for clients everywhere, we've collaborated with
              couples, creatives, founders, and families who refuse the ordinary. Our language is
              gold, shadow, and the quiet space between.
            </p>
            <p data-reveal style={{ transitionDelay: "240ms" }}>
              Every commission is taken personally. There is no team of associates, no factory line.
              Just one lens, one vision, and a fanatical commitment to the image you'll keep
              forever.
            </p>
          </div>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 border border-primary/40 text-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/10 transition-all tilt-hover"
          >
            Work With Us <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-4 gap-10 text-center scene-3d">
          {[
            { n: "120+", l: "Commissions" },
            { n: "32", l: "Countries" },
            { n: "14", l: "Awards" },
            { n: "6yr", l: "Practice" },
          ].map((s, i) => (
            <div key={i} data-reveal="zoom" style={{ transitionDelay: `${i * 100}ms` }} className="tilt-hover">
              <p className="font-display text-5xl md:text-6xl text-gradient-gold animate-drift-slow inline-block" style={{ animationDelay: `${i * 0.6}s` }}>{s.n}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-24 text-center" data-reveal>
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6">Featured In</p>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 font-display text-2xl text-muted-foreground/70 italic">
          <span className="tilt-hover">Vogue Italia</span>
          <span className="tilt-hover">Harper's Bazaar</span>
          <span className="tilt-hover">Rolling Stone</span>
          <span className="tilt-hover">WSJ Magazine</span>
          <span className="tilt-hover">Numéro</span>
        </div>
      </section>
    </SiteLayout>
  );
}
