import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Star, Aperture, Sparkles, Film } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { TiltCard } from "@/components/TiltCard";
import { ParticleField } from "@/components/ParticleField";
import { SmartImage } from "@/components/SmartImage";
import { useParallax } from "@/hooks/useParallax";
import { useMouseParallax } from "@/hooks/useMouseParallax";
import heroUrl from "@/assets/studio-zeez-hero.jpg";
import hero from "@/assets/studio-zeez-hero.jpg?picture";
import watch from "@/assets/studio-zeez-product-watch.jpg?picture";
import upPurple from "@/assets/upload-portrait-purple.jpg?picture";
import upFamily from "@/assets/upload-family-portrait.jpg?picture";
import upSmoke from "@/assets/upload-smoke-portrait.jpg?picture";
import upWhiteShirt from "@/assets/upload-white-shirt.jpg?picture";
import upTealSit from "@/assets/upload-teal-sit.jpg?picture";
import upNyCap from "@/assets/upload-ny-cap.jpg?picture";
import upSetWave from "@/assets/upload-set-wave.jpg?picture";
import upDenim from "@/assets/upload-denim-ladder.jpg?picture";
import upBlackDress from "@/assets/upload-black-dress.jpg?picture";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Studio Zeez — Luxury Photography in Gold & Black" },
      { name: "description", content: "Cinematic, gold-touched photography by Studio Zeez. Editorial portraits, weddings, fashion, and luxury brand imagery." },
      { property: "og:image", content: heroUrl },
      { name: "twitter:image", content: heroUrl },
    ],
    links: [
      { rel: "preload", as: "image", href: hero.img.src, imagesrcset: hero.sources.webp, imagesizes: "(max-width: 768px) 100vw, 60vw", fetchpriority: "high" } as never,
    ],
  }),
});

function Index() {
  const heroImgRef = useParallax(0.25) as React.RefObject<HTMLDivElement>;
  const featuredRef = useParallax(0.12) as React.RefObject<HTMLDivElement>;
  const heroSceneRef = useMouseParallax(18) as React.RefObject<HTMLDivElement>;
  return (
    <SiteLayout>
      {/* HERO */}
      <section ref={heroSceneRef} className="relative min-h-[92vh] overflow-hidden bg-gradient-dark scene-3d">
        <ParticleField className="z-0" />
        <div className="absolute inset-0 preserve-3d">
          <div
            ref={heroImgRef}
            className="absolute right-0 top-0 h-full w-full md:w-3/5 will-change-transform floating-frame"
            style={{ transform: "translate3d(0, var(--py, 0px), 0) scale(1.08)" }}
          >
            <SmartImage
              picture={hero}
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              alt="Studio Zeez beauty portrait photographed in studio light"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 md:via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          {/* Floating depth layers */}
          <div className="hidden md:block absolute top-24 right-[58%] w-40 h-56 overflow-hidden border border-primary/30 shadow-elegant floating-frame animate-drift" style={{ transform: "translate3d(var(--mx,0px), var(--my,0px), 60px) rotateY(var(--ry,0deg)) rotateX(var(--rx,0deg))" }}>
            <SmartImage picture={upWhiteShirt} sizes="160px" alt="" className="h-full w-full object-cover opacity-90" />
          </div>
          <div className="hidden md:block absolute bottom-24 right-[62%] w-32 h-44 overflow-hidden border border-primary/20 shadow-elegant floating-frame animate-drift" style={{ animationDelay: "1.4s", transform: "translate3d(calc(var(--mx,0px) * -0.6), calc(var(--my,0px) * -0.6), 30px) rotateY(var(--ry,0deg)) rotateX(var(--rx,0deg))" }}>
            <SmartImage picture={upTealSit} sizes="128px" alt="" className="h-full w-full object-cover opacity-90" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 md:pt-40 pb-20 grid md:grid-cols-2 gap-10 items-center min-h-[92vh] preserve-3d">
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
            <dl className="mt-14 grid grid-cols-3 gap-6 max-w-lg" data-reveal>
              {[
                { k: "120+", v: "Commissions" },
                { k: "9yrs", v: "In studio" },
                { k: "14", v: "Publications" },
              ].map((s) => (
                <div key={s.v} className="border-l border-primary/30 pl-4">
                  <dt className="font-display text-3xl md:text-4xl text-gradient-gold">{s.k}</dt>
                  <dd className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mt-1">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-muted-foreground animate-shimmer">
          Scroll
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section aria-label="Featured in" className="border-y border-border/40 bg-card/20 overflow-hidden">
        <div className="marquee py-6">
          <div className="marquee-track text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, n) => (
              <div key={n} className="flex items-center gap-12 px-6 shrink-0" aria-hidden={n === 1}>
                {["Vogue Italia", "Harper's Bazaar", "Numéro", "Dazed", "WSJ Magazine", "Hypebeast", "L'Officiel", "ELLE"].map((b) => (
                  <span key={b} className="flex items-center gap-12">
                    <span className="text-primary/80">{b}</span>
                    <span className="h-px w-12 bg-primary/30" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-6 lg:px-10 py-28 text-center" data-reveal>
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
      <section ref={featuredRef} className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-24 scene-3d" style={{ transform: "translate3d(0, calc(var(--py, 0px) * 0.4), 0)" }}>
        <div className="flex items-end justify-between mb-12">
          <div data-reveal="left">
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-3">Selected Work</p>
            <h3 className="font-display text-3xl md:text-5xl">Recent Frames</h3>
          </div>
          <Link to="/gallery" className="hidden md:inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all tilt-hover" data-reveal="right">
            All work <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-12 gap-4 md:gap-6 preserve-3d">
          {[
            { pic: upSmoke, span: "col-span-12 md:col-span-7 row-span-2 aspect-[4/5] md:aspect-auto", label: "Editorial", sizes: "(max-width: 768px) 100vw, 58vw" },
            { pic: upPurple, span: "col-span-6 md:col-span-5 aspect-[4/5]", label: "Portrait", sizes: "(max-width: 768px) 50vw, 42vw" },
            { pic: watch, span: "col-span-6 md:col-span-5 aspect-[4/5]", label: "Product", sizes: "(max-width: 768px) 50vw, 42vw" },
            { pic: upFamily, span: "col-span-12 md:col-span-7 aspect-[16/10]", label: "Family", sizes: "(max-width: 768px) 100vw, 58vw" },
            { pic: upNyCap, span: "col-span-6 md:col-span-4 aspect-[4/5]", label: "Street", sizes: "(max-width: 768px) 50vw, 33vw" },
            { pic: upTealSit, span: "col-span-6 md:col-span-4 aspect-[4/5]", label: "Couture", sizes: "(max-width: 768px) 50vw, 33vw" },
            { pic: upSetWave, span: "col-span-12 md:col-span-4 aspect-[4/5]", label: "Set Design", sizes: "(max-width: 768px) 100vw, 33vw" },
          ].map((item, i) => (
            <TiltCard key={i} className={`${item.span}`} max={8}>
              <figure
                className="group relative h-full w-full overflow-hidden bg-card depth-glow"
                data-reveal="zoom"
                style={{ transform: `translateZ(${(i % 3) * 12 - 12}px)` }}
              >
                <SmartImage
                  picture={item.pic}
                  alt={`${item.label} photography by Studio Zeez`}
                  sizes={item.sizes}
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

      {/* PROCESS */}
      <section className="relative bg-card/20 border-y border-border/40 overflow-hidden">
        <ParticleField className="opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="text-center mb-16" data-reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-primary mb-4">The Process</p>
            <h3 className="font-display text-4xl md:text-6xl">A <span className="text-gradient-gold italic">three-act</span> craft.</h3>
          </div>
          <ol className="grid md:grid-cols-3 gap-6 scene-3d">
            {[
              { icon: Aperture, n: "01", t: "Concept", d: "Mood, references, and a shared visual language tailored to the subject." },
              { icon: Film, n: "02", t: "Capture", d: "Cinematic lighting and direction inside our studio or on location." },
              { icon: Sparkles, n: "03", t: "Finish", d: "Hand-graded color, sculpted retouching, and gallery-ready delivery." },
            ].map((p, i) => (
              <li key={p.n} className="stage-card p-8 border border-border/60 bg-background/40" data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="flex items-center justify-between mb-6">
                  <p.icon className="text-primary tilt-hover" size={28} strokeWidth={1.2} />
                  <span className="font-display text-3xl text-gradient-gold">{p.n}</span>
                </div>
                <h4 className="font-display text-2xl mb-3">{p.t}</h4>
                <p className="text-muted-foreground leading-relaxed">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-3 gap-12 scene-3d">
          {[
            { icon: Camera, title: "Editorial & Fashion", text: "Story-driven shoots for magazines, look-books, and brand campaigns." },
            { icon: Star, title: "Weddings & Events", text: "Elegant, cinematic coverage of once-in-a-lifetime celebrations." },
            { icon: Camera, title: "Brand & Product", text: "Luxury still life and lifestyle imagery that elevates the object." },
          ].map((s, i) => (
            <div key={i} className="group stage-card p-2" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <s.icon className="text-primary mb-5 tilt-hover" size={32} strokeWidth={1.2} />
              <h4 className="font-display text-2xl mb-3">{s.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DIPTYCH */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 grid md:grid-cols-2 gap-6 scene-3d">
        {[upDenim, upBlackDress].map((pic, i) => (
          <TiltCard key={i} className="aspect-[4/5]" max={6}>
            <figure className="relative h-full w-full overflow-hidden floating-frame depth-glow" data-reveal={i === 0 ? "left" : "right"}>
              <SmartImage
                picture={pic}
                alt="Studio Zeez editorial frame"
                sizes="(max-width: 768px) 100vw, 48vw"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </figure>
          </TiltCard>
        ))}
      </section>

      {/* TESTIMONIAL */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-28 text-center" data-reveal="zoom">
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
      <section className="relative overflow-hidden" data-reveal>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="border border-primary/30 p-12 md:p-20 text-center bg-gradient-dark shadow-elegant relative overflow-hidden">
            <ParticleField />
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
