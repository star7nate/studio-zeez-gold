import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { TiltCard } from "@/components/TiltCard";
import { ParticleField } from "@/components/ParticleField";
import { useParallax } from "@/hooks/useParallax";
import hero from "@/assets/studio-zeez-hero.jpg";
import watch from "@/assets/studio-zeez-product-watch.jpg";
import upPurple from "@/assets/upload-portrait-purple.jpg";
import upFamily from "@/assets/upload-family-portrait.jpg";
import upSmoke from "@/assets/upload-smoke-portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Studio Zeez — Luxury Photography in Gold & Black" },
      { name: "description", content: "Cinematic, gold-touched photography by Studio Zeez. Editorial portraits, weddings, fashion, and luxury brand imagery." },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
});

function Index() {
  const heroImgRef = useParallax(0.25) as React.RefObject<HTMLImageElement>;
  const featuredRef = useParallax(0.12) as React.RefObject<HTMLDivElement>;
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[92vh] overflow-hidden bg-gradient-dark">
        <ParticleField className="z-0" />
        <div className="absolute inset-0">
          <img
            ref={heroImgRef}
            src={hero}
            alt="Studio Zeez beauty portrait photographed in studio light"
            width={1080}
            height={1920}
            className="absolute right-0 top-0 h-full w-full md:w-3/5 object-cover object-center will-change-transform"
            style={{ transform: "translate3d(0, var(--py, 0px), 0) scale(1.08)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 md:via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-20 grid md:grid-cols-2 gap-10 items-center min-h-[92vh]">
          <div className="animate-fade-up">
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-primary" /> Est. 2018 · Studio Zeez
            </p>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground">
              Light, shadow,
              <br />
              and <span className="text-gradient-gold italic">gold</span>.
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
              A cinematic photography studio crafting timeless imagery for fashion houses,
              brides, and discerning brands across the globe.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/gallery"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] font-medium shadow-gold hover:opacity-90 transition-all"
              >
                View Portfolio
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-primary/40 text-primary text-xs uppercase tracking-[0.3em] hover:bg-primary/10 transition-all"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-muted-foreground animate-shimmer">
          Scroll
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-6">The Studio</p>
        <h2 className="font-display text-4xl md:text-6xl leading-tight">
          We don't capture moments.
          <br />
          We <span className="text-gradient-gold italic">forge</span> them.
        </h2>
        <div className="gold-divider w-32 mx-auto my-10" />
        <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
          Every frame from Studio Zeez is sculpted from intention — a marriage of cinematic light,
          editorial styling, and a deep reverence for the subject. The result: imagery that doesn't
          just record, but endures.
        </p>
      </section>

      {/* FEATURED GRID */}
      <section ref={featuredRef} className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-24" style={{ transform: "translate3d(0, calc(var(--py, 0px) * 0.4), 0)" }}>
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">Selected Work</p>
            <h3 className="font-display text-3xl md:text-5xl">Recent Frames</h3>
          </div>
          <Link to="/gallery" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            All work <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {[
            { src: upSmoke, span: "col-span-12 md:col-span-7 row-span-2 aspect-[4/5] md:aspect-auto", label: "Editorial" },
            { src: upPurple, span: "col-span-6 md:col-span-5 aspect-[4/5]", label: "Portrait" },
            { src: watch, span: "col-span-6 md:col-span-5 aspect-[4/5]", label: "Product" },
            { src: upFamily, span: "col-span-12 md:col-span-7 aspect-[16/10]", label: "Family" },
          ].map((item, i) => (
            <TiltCard key={i} className={`${item.span}`} max={6}>
              <figure className="group relative h-full w-full overflow-hidden bg-card">
                <img
                  src={item.src}
                  alt={`${item.label} photography by Studio Zeez`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                <figcaption className="absolute bottom-5 left-5 text-xs uppercase tracking-[0.3em] text-primary">
                  {item.label}
                </figcaption>
              </figure>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-3 gap-12">
          {[
            { icon: Camera, title: "Editorial & Fashion", text: "Story-driven shoots for magazines, look-books, and brand campaigns." },
            { icon: Star, title: "Weddings & Events", text: "Elegant, cinematic coverage of once-in-a-lifetime celebrations." },
            { icon: Camera, title: "Brand & Product", text: "Luxury still life and lifestyle imagery that elevates the object." },
          ].map((s, i) => (
            <div key={i} className="group">
              <s.icon className="text-primary mb-5" size={32} strokeWidth={1.2} />
              <h4 className="font-display text-2xl mb-3">{s.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-28 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-8">Praise</p>
        <blockquote className="font-display text-2xl md:text-4xl leading-snug italic">
          "Zeez doesn't just photograph you — they reveal the version of you that
          history will remember."
        </blockquote>
        <div className="gold-divider w-24 mx-auto my-8" />
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Vogue Italia · Editorial Director
        </p>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="border border-primary/30 p-12 md:p-20 text-center bg-gradient-dark shadow-elegant">
            <h2 className="font-display text-4xl md:text-6xl">
              Let's create something <span className="text-gradient-gold italic">unforgettable.</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto">
              Limited commissions available each season. Reach out to begin the conversation.
            </p>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-3 px-10 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all"
            >
              Begin Your Commission <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
