import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Camera, Heart, Sparkles, Building2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  component: Services,
  head: () => ({
    meta: [
      { title: "Services — Studio Zeez" },
      { name: "description", content: "Editorial, weddings, brand, and private commissions by Studio Zeez. Bespoke luxury photography services." },
      { property: "og:title", content: "Services — Studio Zeez" },
      { property: "og:description", content: "Editorial, weddings, brand, and private commissions." },
    ],
  }),
});

const services = [
  {
    icon: Sparkles,
    title: "Editorial & Fashion",
    price: "From $4,800",
    text: "Concept-driven shoots for magazines, designers, and fashion houses. Includes mood-boarding, on-set direction, and full post-production.",
    features: ["Half / full day", "Stylist coordination", "20–60 retouched frames"],
  },
  {
    icon: Heart,
    title: "Weddings & Celebrations",
    price: "From $6,500",
    text: "Cinematic coverage of weddings and milestone events. Discreet on the day, devastatingly beautiful in delivery.",
    features: ["8–12 hours coverage", "Second photographer optional", "Heirloom album available"],
  },
  {
    icon: Building2,
    title: "Brand & Product",
    price: "From $3,200",
    text: "Still-life and lifestyle imagery that gives objects gravitas. Built for campaigns, e-commerce hero shots, and look-books.",
    features: ["Studio or location", "Up to 30 SKUs", "Commercial license"],
  },
  {
    icon: Camera,
    title: "Private Portraits",
    price: "From $1,800",
    text: "Intimate portrait sessions in our studio or a location of your choosing. Perfect for personal branding, family, and legacy work.",
    features: ["2-hour session", "Wardrobe consultation", "15 retouched frames"],
  },
];

function Services() {
  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 md:py-28">
        <p className="text-xs uppercase tracking-[0.4em] text-primary mb-5">What We Do</p>
        <h1 className="font-display text-5xl md:text-7xl">
          Bespoke <span className="text-gradient-gold italic">commissions</span>
        </h1>
        <div className="gold-divider w-32 mt-8" />
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Every project at Studio Zeez is shaped to its subject. The packages below are a starting
          point — final scope and pricing are tailored after a brief discovery call.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <article
            key={i}
            className="group relative border border-border/60 p-10 bg-card/40 hover:border-primary/60 hover:shadow-gold transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-6">
              <s.icon className="text-primary" size={36} strokeWidth={1.2} />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">{s.price}</span>
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
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-28">
        <div className="border border-primary/30 p-12 md:p-16 text-center bg-gradient-dark shadow-elegant">
          <h2 className="font-display text-3xl md:text-5xl">
            Have something <span className="text-gradient-gold italic">unconventional</span> in mind?
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
            We thrive on unusual briefs. Tell us your vision and we'll craft a proposal.
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
