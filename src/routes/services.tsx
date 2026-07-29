import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Camera, Heart, Sparkles, Building2, Home, Users, Clock, Armchair, ArrowRight } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { ParticleField } from "@/components/ParticleField";

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

const services = [
  {
    icon: Camera,
    title: "Full Session — Content Studio",
    price: "₦200,000",
    duration: "90 mins",
    text: "Full photo shoot session in our content studio. 3 outfits with 10 edited pictures.",
    features: ["3 outfits", "10 edited pictures", "Content studio"],
  },
  {
    icon: Clock,
    title: "Half Session — Content Studio",
    price: "₦150,000",
    duration: "60 mins",
    text: "Half session in our content studio. 2 outfits with 6 edited pictures.",
    features: ["2 outfits", "6 edited pictures", "Content studio"],
  },
  {
    icon: Sparkles,
    title: "Mini Session — Content Studio",
    price: "₦100,000",
    duration: "30 mins",
    text: "Quick studio session. 1 outfit with 3 edited pictures.",
    features: ["1 outfit", "3 edited pictures", "Content studio"],
  },
  {
    icon: Clock,
    title: "Half Session — Content Space",
    price: "₦50,000",
    duration: "30 mins",
    text: "Half session in our content space. 2 outfits with 6 edited pictures.",
    features: ["2 outfits", "6 edited pictures", "Content space"],
  },
  {
    icon: Armchair,
    title: "Designer Space Session",
    price: "₦140,000",
    duration: "60 mins",
    text: "A designer space for photography and video to enhance your picture quality.",
    features: ["Designer setup", "Photo + video ready", "60 minutes"],
  },
  {
    icon: Home,
    title: "Home Service",
    price: "₦300,000",
    duration: "90 mins",
    text: "Outdoor shoot with 2–3 outfits and 10 edited pictures. All raw pictures from the session are sent to you via Google Drive.",
    features: ["Outdoor shoot", "2–3 outfits", "10 edited pictures", "All raw files via Google Drive"],
  },
  {
    icon: Users,
    title: "Family Session",
    price: "₦450,000",
    duration: "90 mins",
    text: "Family shoot with 15 edited pictures and one 24×36 frame enlargement.",
    features: ["15 edited pictures", "24×36 frame enlargement", "90 minutes"],
  },
  {
    icon: Building2,
    title: "Content Space for Rent — Single Setup",
    price: "₦20,000",
    duration: "30 mins",
    text: "Use a particular setup of your choice in our content space for 30 minutes.",
    features: ["One setup of choice", "30 minutes", "No shoot included"],
  },
  {
    icon: Building2,
    title: "Content Space for Rent — Full Setup",
    price: "₦50,000",
    duration: "60 mins",
    text: "Use the whole setup in our content space for one hour.",
    features: ["Whole setup access", "60 minutes", "No shoot included"],
  },
  {
    icon: Users,
    title: "Family Session — Without Frame",
    price: "₦350,000",
    duration: "90 mins",
    text: "Family shoot without frame. 12 retouched pictures, with all unedited pictures sent via Google Drive.",
    features: ["12 retouched pictures", "All raw files via Google Drive", "90 minutes"],
  },
  {
    icon: Camera,
    title: "1 Outfit — Content Space",
    price: "₦70,000",
    duration: "30 mins",
    text: "One outfit at the content space: ₦20,000 for 30 minutes space rental + ₦50,000 for the shoot.",
    features: ["1 outfit", "3 edited pictures", "Space rental + shoot"],
  },
];

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
            <article
              data-reveal={i % 2 === 0 ? "left" : "right"}
              style={{ transitionDelay: `${i * 60}ms`, animationDelay: `${i * 0.7}s` }}
              className="group relative border border-border/60 p-10 bg-card/40 hover:border-primary/60 hover:shadow-gold transition-all duration-500 stage-card depth-glow h-full"
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
            </article>
          </TiltCard>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-28" data-reveal="zoom">
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
