import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { ParticleField } from "@/components/ParticleField";
import { packages } from "@/lib/booking";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — Studio Zeez" },
      { name: "description", content: "Studio Zeez photography packages: studio sessions, home service, family portraits, and content-space rentals." },
      { property: "og:title", content: "Services — Studio Zeez" },
      { property: "og:description", content: "Studio sessions, home service, family portraits, and content-space rentals." },
    ],
  }),
});

const services = packages;

function Services() {
  return (
    <SiteLayout>
      <section className="relative max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <ParticleField />
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">What We Do</p>
        <h1 className="font-display text-5xl md:text-7xl" data-reveal>
          Studio <span className="text-gradient-gold italic">packages</span>
        </h1>
        <div className="gold-divider w-32 mt-8" />
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed" data-reveal>
          Choose a package that fits your moment. Want something tailored? Book a discovery call and we’ll build a session around you.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 grid md:grid-cols-2 gap-6 scene-3d">
        {services.map((s, i) => (
          <TiltCard key={i} max={6} className="animate-drift-slow" >
            <Link
              to="/book/$slug"
              params={{ slug: s.slug }}
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={{ transitionDelay: `${i * 60}ms`, animationDelay: `${i * 0.7}s` }}
              className="group relative block border border-border/60 p-10 bg-card/40 hover:border-primary/60 hover:shadow-gold transition-all duration-500 stage-card depth-glow h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <s.icon className="text-primary tilt-hover" size={36} strokeWidth={1.2} style={{ transform: "translateZ(30px)" }} />
                <div className="text-right">
                  <span className="block text-xs uppercase tracking-[0.3em] text-muted-foreground">{s.duration}</span>
                  <span className="block text-sm uppercase tracking-[0.2em] text-primary mt-1">{s.price}</span>
                </div>
              </div>
              <h3 className="font-display text-3xl mb-4">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{s.text}</p>
              <ul className="space-y-2 text-sm text-muted-foreground border-t border-border/40 pt-5">
                {s.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <span className="h-px w-4 bg-primary" /> {f}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-primary group-hover:gap-3 transition-all">
                Book this session <ArrowRight size={14} />
              </span>
            </Link>
          </TiltCard>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-28" data-reveal="zoom">
        <div className="mb-16 border border-primary/30 bg-card/40 p-8 md:p-10">
          <h2 className="font-display text-2xl md:text-3xl">Wedding &amp; event <span className="text-gradient-gold italic">terms</span></h2>
          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><span className="h-px w-4 bg-primary mt-2 shrink-0" /> Mode of payment: 75–80% upfront.</li>
            <li className="flex gap-3"><span className="h-px w-4 bg-primary mt-2 shrink-0" /> If the event runs for 2 days, an additional 30% of the chosen package applies for the second day.</li>
            <li className="flex gap-3"><span className="h-px w-4 bg-primary mt-2 shrink-0" /> For venues outside Lagos, the client is responsible for our logistics.</li>
          </ul>
        </div>
        <div className="relative overflow-hidden border border-primary/30 p-12 md:p-16 text-center bg-gradient-dark shadow-elegant">
          <ParticleField />
          <h2 className="font-display text-3xl md:text-5xl">
            Have something <span className="text-gradient-gold italic">unconventional</span> in mind?
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
            We thrive on unusual briefs. Tell us your vision and we&apos;ll craft a proposal.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 px-10 py-4 bg-gradient-gold text-primary-foreground text-xs uppercase tracking-[0.3em] shadow-gold hover:opacity-90 transition-all"
          >
            Start a Conversation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
